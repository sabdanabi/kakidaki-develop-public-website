export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token')

  const publicRoutes = ['/', '/login', '/register']

  // Redirect to login if user is not authenticated and trying to access a private route
  if (!token.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // Redirect to dashboard if user is already authenticated and trying to access login or register
  if (token.value && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/dashboard')
  }
})
