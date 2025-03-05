package management

import (
	"errors"

	"github.com/mackerelio/go-osstat/cpu"
	"github.com/mackerelio/go-osstat/memory"
	"github.com/mackerelio/go-osstat/network"
)

type MemoryInfo struct {
	Total uint64
	Used  uint64
}
type OSInfo struct {
	Memory       MemoryInfo
	NetworkStats []network.Stats
}

func GetOSInfo() (OSInfo, error) {

	mem, memErr := memory.Get()
	_, cpuErr := cpu.Get()
	net, netErr := network.Get()
	if err := errors.Join(memErr, cpuErr, netErr); err != nil {
		return OSInfo{}, err
	}
	return OSInfo{
		NetworkStats: net,
		Memory:       MemoryInfo{Total: mem.Total, Used: mem.Used}}, nil
}
