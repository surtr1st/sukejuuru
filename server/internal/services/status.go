package services

import (
	"sukejuuru/internal/models"
	"sukejuuru/internal/utils"

	"github.com/jmoiron/sqlx"
)

type statusService struct {
	db *sqlx.DB
}

func UseStatus() *statusService {
	return &statusService{db: utils.UsePostgres()}
}

func (service statusService) FindAll() ([]models.Status, error) {
	var status []models.Status
	query := "SELECT id, display, description, created_at, color FROM status"
	if err := service.db.Select(&status, query); err != nil {
		return nil, err
	}
	return status, nil
}
