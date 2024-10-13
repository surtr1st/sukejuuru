package controllers

import (
	"encoding/json"
	"net/http"
	"sukejuuru/internal/services"
)

type colorController struct{}

func UseColor() colorController {
	return colorController{}
}

func (ctrl colorController) RetrieveColors(w http.ResponseWriter, r *http.Request) {
	result, err := services.UseColor().FindAll()
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
