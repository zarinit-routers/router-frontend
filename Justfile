# [working-directory: "back"]
# build-router-client:
#     # CGO_ENABLED=1 \
#     # CGO_CFLAGS=$(pkg-config --cflags libnm) \
#     # CGO_LDFLAGS=$(pkg-config --libs libnm) \
#         go build -o ./build/router-client -x ./cmd/router-client/main.go

# [working-directory: "back"]
# run-router-client: build-router-client
#     ./build/router-client
PROTOBUF_OUT_DIR := "./gen/protobuf/router-internal"

[working-directory: "server"]
generate-proto:
    mkdir -p {{PROTOBUF_OUT_DIR}}
    protoc \
        -I proto \
        proto/router-internal.proto \
        --go_out={{PROTOBUF_OUT_DIR}} \
        --go_opt=paths=source_relative \
        --go-grpc_out={{PROTOBUF_OUT_DIR}} \
        --go-grpc_opt=paths=source_relative
    eza --tree -L 3 {{PROTOBUF_OUT_DIR}}
