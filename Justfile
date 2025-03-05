[working-directory: "back"]
build-router-client:
    # CGO_ENABLED=1 \
    # CGO_CFLAGS=$(pkg-config --cflags libnm) \
    # CGO_LDFLAGS=$(pkg-config --libs libnm) \
        go build -o ./build/router-client -x ./cmd/router-client/main.go

[working-directory: "back"]
run-router-client: build-router-client
    ./build/router-client

