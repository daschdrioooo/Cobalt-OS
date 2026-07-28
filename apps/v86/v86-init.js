var v86ScreenContainer = document.querySelector("#terminalscreen")

var emulator = new V86({
  wasm_path: "apps/v86/v86.wasm",
  memory_size: 512 * 1024 * 1024,
  vga_memory_size: 8 * 1024 * 1024,
  screen_container: v86ScreenContainer,
  bios: { url: "apps/v86/seabios.bin" },
  vga_bios: { url: "apps/v86/vgabios.bin" },
  filesystem: {
    baseurl: "apps/v86/images/alpine-rootfs-flat",
    basefs: "apps/v86/images/alpine-fs.json"
  },
  autostart: true,
  bzimage_initrd_from_filesystem: true,
  cmdline: "rw root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose modules=virtio_pci tsc=reliable"
})