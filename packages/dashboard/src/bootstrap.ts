import App from "./components/App.svelte"
import 'modern-css-reset'

export default function bootstrap() {
  const app = new App({
    target: document.body
  });

  return app
}
