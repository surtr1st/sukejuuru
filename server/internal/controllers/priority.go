package controllers

import (
	"encoding/json"
	"net/http"
	"sukejuuru/internal/services"
)

type priorityController struct{}

func UsePriority() priorityController {
	return priorityController{}
}

func (ctrl priorityController) RetrievePriorities(w http.ResponseWriter, r *http.Request) {
	result, err := services.UsePriority().FindAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	response, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}
