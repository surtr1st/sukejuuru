package routers

import (
	"sukejuuru/internal/controllers"

	"github.com/go-chi/chi/v5"
)

func UsePriorityRouter(r chi.Router) {
	r.Get("/priorities", controllers.UsePriority().RetrievePriorities)
}
