package main

import (
	"net/http"
	"sukejuuru/internal/config"
	subRouter "sukejuuru/internal/routers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	port := ":7000"
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(config.UseDefaultCors())
	router.Use(config.UseComprehensiveSecurityHeaders)

	router.Route("/api", func(r chi.Router) {
		subRouter.UseNodeRouter(r)
		subRouter.UseTaskRouter(r)
		subRouter.UseColorRouter(r)
		subRouter.UsePriorityRouter(r)
		subRouter.UseStatusRouter(r)
	})

	http.ListenAndServe(port, router)
}
