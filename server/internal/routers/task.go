package routers

import (
	"sukejuuru/internal/controllers"
	"sukejuuru/internal/middlewares"

	"github.com/go-chi/chi/v5"
)

func UseTaskRouter(r chi.Router) {
	r.With(middlewares.UseTask().ValidateQuery).Get("/tasks", controllers.UseTask().RetrieveTasksByNode)
	r.With(middlewares.UseTask().ValidatePayload).Post("/tasks", controllers.UseTask().AddTask)
}
