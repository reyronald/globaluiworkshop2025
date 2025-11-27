import "storybook/internal/types"

declare module "storybook/internal/types" {
  type DesignConfig = import("@storybook/addon-designs").Config

  export interface Parameters {
    msw?: { handlers: import("msw").HttpHandler[] }
    design?: DesignConfig | DesignConfig[]
  }
}
