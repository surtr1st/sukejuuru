package services

import (
	"sukejuuru/internal/models"
	"sukejuuru/internal/utils"

	"github.com/jmoiron/sqlx"
)

type priorityService struct {
	db *sqlx.DB
}

func UsePriority() *priorityService {
	return &priorityService{db: utils.UsePostgres()}
}

func (service priorityService) FindAll() ([]models.Priority, error) {
	var priorities []models.Priority
	query := "SELECT id, display, description, created_at, color FROM priority"
	if err := service.db.Select(&priorities, query); err != nil {
		return nil, err
	}
	return priorities, nil
}
