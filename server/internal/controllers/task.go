package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"sukejuuru/internal/models"
	"sukejuuru/internal/services"
)

type taskController struct{}

func UseTask() taskController {
	return taskController{}
}

func (ctrl taskController) RetrieveTasksByNode(w http.ResponseWriter, r *http.Request) {
	nodeId, err := strconv.Atoi(r.URL.Query().Get("nodeId"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	result, err := services.UseTask().FindAllByNode(nodeId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(result)
	if err != nil {
		http.Error(w, "", http.StatusInternalServerError)
		return
	}
	w.Write([]byte(response))
}

func (ctrl taskController) AddTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result, err := services.UseTask().Create(task)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(result))
}
