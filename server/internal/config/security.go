package config

import "net/http"

func UseComprehensiveSecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Security-Policy", "default-src 'self'; script-src 'self' https://trusted.cdn.com;")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		w.Header().Set(
			"Strict-Transport-Security",
			"max-age=31536000; includeSubDomains; preload",
		)
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "no-referrer")
		w.Header().Set(
			"Feature-Policy",
			"vibrate 'none'; camera 'self'; microphone 'none'",
		)

		next.ServeHTTP(w, r)
	})
}
