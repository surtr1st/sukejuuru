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

	"github.com/go-chi/chi/v5"
)

type nodeMiddleware struct{}

func UseNode() nodeMiddleware {
	return nodeMiddleware{}
}

func (m nodeMiddleware) ValidateParams(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		nodeId := chi.URLParam(r, string(key.NodeId))
		if utils.IsEmpty(nodeId) {
			http.Error(w, err.MISSING_REQUIRED_PARAMS, http.StatusNotAcceptable)
			return
		}
		ctx := context.WithValue(r.Context(), key.NodeId, nodeId)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (m nodeMiddleware) ValidatePayload(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var node models.Node
		if err := json.NewDecoder(r.Body).Decode(&node); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		modelName := "node"
		if utils.IsEmpty(node.Title) {
			http.Error(w, fmt.Sprintf(err.MISSING_TITLE, modelName), http.StatusNotAcceptable)
			return
		}

		ctx := context.WithValue(r.Context(), key.NodePayload, node)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
