package services

import (
	"sukejuuru/internal/models"
	"sukejuuru/internal/utils"

	"github.com/jmoiron/sqlx"
)

type colorService struct {
	db *sqlx.DB
}

func UseColor() *colorService {
	return &colorService{db: utils.UsePostgres()}
}

func (service colorService) FindAll() ([]models.Color, error) {
	var colors []models.Color
	query := "SELECT id, display, hex, created_at FROM color"
	if err := service.db.Select(&colors, query); err != nil {
		return nil, err
	}
	return colors, nil
}
