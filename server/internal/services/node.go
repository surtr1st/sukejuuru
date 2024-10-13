package services

import (
	success "sukejuuru/internal/enums"
	"sukejuuru/internal/models"
	"sukejuuru/internal/utils"

	"github.com/jmoiron/sqlx"
)

type nodeService struct {
	db *sqlx.DB
}

func UseNode() *nodeService {
	return &nodeService{
		db: utils.UsePostgres(),
	}
}

func (service nodeService) FindAll() ([]models.Node, error) {
	var nodes []models.Node
	query := "SELECT id, title, created_at FROM node"
	if err := service.db.Select(&nodes, query); err != nil {
		return nil, err
	}
	return nodes, nil
}

func (service nodeService) FindById(id int) (models.Node, error) {
	var node models.Node
	query := `
		SELECT id, title, created_at
		FROM node
		WHERE id = $1
	`

	if err := service.db.Select(&node, query, id); err != nil {
		return models.Node{}, err
	}
	return node, nil
}

func (service nodeService) Create(values models.Node) (string, error) {
	query := "INSERT INTO node (title, created_at) VALUES ($1, $2)"
	if _, err := service.db.Exec(query, values); err != nil {
		return "", err
	}
	return success.CREATED, nil
}

func (service nodeService) Update(id int, values models.Node) (string, error) {
	query := "UPDATE TABLE node SET title = $1 WHERE id = $2"
	if _, err := service.db.Exec(query, values, id); err != nil {
		return "", err
	}
	return success.UPDATED, nil
}

func (service nodeService) Delete(id int) (string, error) {
	query := "DELETE TABLE node WHERE id = $1"
	if _, err := service.db.Exec(query, id); err != nil {
		return "", err
	}
	return success.DELETED, nil
}
