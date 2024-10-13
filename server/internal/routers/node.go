package routers

import (
	"sukejuuru/internal/controllers"
	"sukejuuru/internal/middlewares"

	"github.com/go-chi/chi/v5"
)

func UseNodeRouter(r chi.Router) {
	r.Get("/nodes", controllers.UseNode().RetrieveNodes)
	r.With(middlewares.UseNode().ValidateParams).Get("/nodes/{id}", controllers.UseNode().RetrieveNodeById)
	r.With(middlewares.UseNode().ValidatePayload).Post("/nodes", controllers.UseNode().AddNode)
}
