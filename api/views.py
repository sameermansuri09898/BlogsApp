from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer, LoginSerializer,blogserializer,CommentSrializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from api.utils import send_otp_email,random_otp
from api.models import User,Otp,Blog,Comments,Likes
from .serializer import Otpserializer,ResendOtpSerializer,passwordchange
from rest_framework import viewsets
from rest_framework.exceptions import PermissionDenied

class register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            otp = random_otp()
            print(otp)
            Otp.objects.create(user=user,otp=otp)
            user.is_verified = False
            user.save()
            send_otp_email(user.email,str(otp))
            return Response({'msg':'OTP sent successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VericationOtp(APIView):
    def post(self,request):
        serializer=Otpserializer(data=request.data)
        if serializer.is_valid():
            
            return Response({'msg':'OTP verified successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResendOtp(APIView):
    def post(self,request):
        serializer=ResendOtpSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.user
            otp=random_otp()
            print(otp)
            Otp.objects.filter(user=user).delete()
            Otp.objects.create(user=user,otp=otp)
            user.is_verified = False
            user.save()
            send_otp_email(user.email,str(otp))
            return Response({'msg':'OTP sent successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class login(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user is None:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            if not user.is_verified:
                return Response({'detail': 'User is not verified'}, status=status.HTTP_400_BAD_REQUEST)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
 
class logout(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"error": "Refresh token required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(  
                {"msg": "Logout successful"},
                status=status.HTTP_200_OK
            )

        except Exception:
            return Response(
                {"error": "Invalid or expired token"},
                status=status.HTTP_400_BAD_REQUEST
            )


class ChangePasswordView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def post(self,request):
        serializer=passwordchange(data=request.data,context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
    

class blogcview(viewsets.ModelViewSet):

    queryset = Blog.objects.all().order_by('id')
    serializer_class = blogserializer

    permission_classes= [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def perform_create(self, serializer):
        serializer.save(bloggers=self.request.user)

    def perform_update(self, serializer):
        if self.get_object().bloggers != self.request.user:
            raise PermissionDenied("not allow to update")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.bloggers != self.request.user:
            raise PermissionDenied("not allow to update")
        instance.delete()
       
class CommntBlog(APIView):
    permission_classes= [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self,request):
        blog=request.data.get('blog')

        try:
            blog_id = Blog.objects.get(id=blog_id)
        except Blog.DoesNotExist:
           return Response({"Blog Does not found"},status=404)

        serializer=CommentSrializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.data,blog=blog_id)

            return Response({
                "mssg":"created successfully",
                "data":serializer.data
            },status=201)

        return Response(serializer.errors,status=400)

    def patch(self,request,pk):
        try:
         instance=Comments.objects.get(id=pk,user=request.user)   
        except Comments.DoesNotExist:
            return Response({"Blog Does not found"},status=404)

        serializer=CommentSrializer(instance,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "msg": "Updated successfully",
                "data": serializer.data
            })
        return Response(status=404)
    
    def destroy(self,request,pk):
        try:
         instance=Comments.objects.get(id=pk,user=request.user)   
        except Comments.DoesNotExist:
            return Response({"Blog Does not found"},status=404)
        instance.delete()
        return Response({"msg": "Deleted successfully"}, status=200) 
    

class togglelikes(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def post(self,request,pk):

        try:
            blog_id=Blog.objects.get(user=request.user,id=pk)
        except Blog.DoesNotExist:
            return Response({"Blog Does Not Found"},status=404)

        like,created = Likes.objects.get_or_create(blog=blog_id,user=request.user)

        if not created:
            like.delete()
            return Response({"liked": False, "msg": "Unliked"})
        return Response({"liked": True, "msg": "Liked"})
