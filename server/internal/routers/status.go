package routers

import (
	"sukejuuru/internal/controllers"

	"github.com/go-chi/chi/v5"
)

func UseStatusRouter(r chi.Router) {
	r.Get("/status", controllers.UseStatus().RetrieveStatus)
}
