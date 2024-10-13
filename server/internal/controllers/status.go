package controllers

import (
	"encoding/json"
	"net/http"
	"sukejuuru/internal/services"
)

type statusController struct{}

func UseStatus() statusController {
	return statusController{}
}

func (ctrl statusController) RetrieveStatus(w http.ResponseWriter, r *http.Request) {
	result, err := services.UseStatus().FindAll()
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
