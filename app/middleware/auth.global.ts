export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token')

  const publicRoutes = ['/', '/login', '/register']

  if (!token.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  if (token.value && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/dashboard')
  }
})
