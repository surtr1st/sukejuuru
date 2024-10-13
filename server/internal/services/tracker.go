package services

import (
	success "sukejuuru/internal/enums"
	"sukejuuru/internal/models"
	"sukejuuru/internal/utils"

	"github.com/jmoiron/sqlx"
)

type trackerService struct {
	db *sqlx.DB
}

func UseTracker() *trackerService {
	return &trackerService{db: utils.UsePostgres()}
}

func (service trackerService) FindAll() ([]models.TrackerLog, error) {
	var trackers []models.TrackerLog
	query := `
		SELECT 
			duration_id, 
			TO_CHAR(made_on_date, 'Dy, Mon DD, YYYY') as made_on 
		FROM tracker 
		GROUP BY made_on, duration_id 
		ORDER BY duration_id DESC
	`
	if err := service.db.Select(&trackers, query); err != nil {
		return nil, err
	}
	return trackers, nil
}

func (service trackerService) Create(values models.Tracker) (string, error) {
	query := "INSERT INTO tracker (duration_id, made_on_date) VALUES ($1, $2)"
	if _, err := service.db.Exec(query, values); err != nil {
		return "", err
	}
	return success.CREATED, nil
}
