package utils

import (
	"log"
	"os"

	"github.com/jmoiron/sqlx"

	"github.com/joho/godotenv"

	_ "github.com/lib/pq"
)

func UsePostgres() *sqlx.DB {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	cstr := os.Getenv("SUKEJUURU_CONNECTION_STRING")

	db, err := sqlx.Connect("postgres", cstr)
	if err != nil {
		log.Fatal(err)
	}
	return db
}
