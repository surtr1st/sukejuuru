package controllers

import (
	"encoding/json"
	"net/http"
	key "sukejuuru/internal/context_key"
	"sukejuuru/internal/models"
	"sukejuuru/internal/services"
)

type nodeController struct{}

func UseNode() nodeController {
	return nodeController{}
}

func (ctrl nodeController) RetrieveNodes(w http.ResponseWriter, r *http.Request) {
	result, err := services.UseNode().FindAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(response))
}

func (ctrl nodeController) AddNode(w http.ResponseWriter, r *http.Request) {
	var node models.Node
	if err := json.NewDecoder(r.Body).Decode(&node); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	result, err := services.UseNode().Create(node)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(result))
}

func (ctrl nodeController) RetrieveNodeById(w http.ResponseWriter, r *http.Request) {
	id := r.Context().Value(key.NodeId).(int)
	result, err := services.UseNode().FindById(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write([]byte(response))
}
