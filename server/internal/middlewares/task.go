package middlewares

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	key "sukejuuru/internal/context_key"
	err "sukejuuru/internal/enums"
	"sukejuuru/internal/models"
	"sukejuuru/internal/utils"
)

type taskMiddleware struct{}

func UseTask() taskMiddleware {
	return taskMiddleware{}
}

func (m taskMiddleware) ValidateQuery(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		nodeId := r.URL.Query().Get(string(key.NodeIdOfTask))
		if utils.IsEmpty(nodeId) {
			http.Error(w, err.MISSING_REQUIRED_PARAMS, http.StatusNotAcceptable)
			return
		}
		ctx := context.WithValue(r.Context(), key.NodeIdOfTask, nodeId)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (m taskMiddleware) ValidatePayload(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var task models.Task
		if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		modelName := "task"
		if utils.IsEmpty(task.Title) {
			http.Error(w, fmt.Sprintf(err.MISSING_TITLE, modelName), http.StatusNotAcceptable)
			return
		}
		if utils.IsEmpty(task.Description) {
			http.Error(w, fmt.Sprintf(err.MISSING_DESCRIPTION, modelName), http.StatusNotAcceptable)
			return
		}
		if task.NodeId == 0 {
			http.Error(w, fmt.Sprintf(err.MISSING_NODE_ID, modelName), http.StatusNotAcceptable)
			return
		}

		ctx := context.WithValue(r.Context(), key.TaskPayload, task)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
