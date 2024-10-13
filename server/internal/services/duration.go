package services

import (
	success "sukejuuru/internal/enums"
	"sukejuuru/internal/models"
	"sukejuuru/internal/utils"

	"github.com/jmoiron/sqlx"
)

type durationService struct {
	db *sqlx.DB
}

func UseDuration() *durationService {
	return &durationService{db: utils.UsePostgres()}
}

func (service durationService) FindAllByNode(nodeId int) ([]models.Log, error) {
	var logs []models.Log
	query := `
		SELECT d.id,
			t.id, t.title, t.color
			d.description, d.time_on_task, d.start_from, d.end_at
		FROM duration d
		JOIN task t ON d.task_id = t.id
		WHERE t.node_id = $1
		ORDER BY d.id DESC
	`

	if err := service.db.Select(&logs, query, nodeId); err != nil {
		return nil, err
	}
	return logs, nil
}

func (service durationService) Create(values models.Duration) (string, error) {
	query := `
		INSERT INTO duration (time_on_task, start_from, end_at, description, task_id)
		VALUES (:time_on_task, :start_from, :end_at, :description, :task_id)
	`
	if _, err := service.db.NamedExec(query, values); err != nil {
		return "", err
	}
	return success.CREATED, nil
}
