package routers

import (
	"sukejuuru/internal/controllers"

	"github.com/go-chi/chi/v5"
)

func UseColorRouter(r chi.Router) {
	r.Get("/colors", controllers.UseColor().RetrieveColors)
}
