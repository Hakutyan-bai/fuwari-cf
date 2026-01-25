<section>
    <script src="https://giscus.app/client.js"
            data-repo="Hakutyan-bai/fuwari-cf"
            data-repo-id="R_kgDOPROPxA"
            data-category="General"
            data-category-id="DIC_kwDOPROPxM4CtXTH"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="top"
            data-theme={$mode === DARK_MODE ? 'dark' : 'light'}
            data-lang="zh-CN"
            crossorigin="anonymous"
            async>
    </script>
</section>

<script>
import { AUTO_MODE, DARK_MODE } from '@constants/constants.ts'
import { onMount } from 'svelte'
import { writable } from 'svelte/store';
import { getStoredTheme } from '@utils/setting-utils.ts'
const mode = writable(AUTO_MODE)
onMount(() => {
  mode.set(getStoredTheme())
})

function updateGiscusTheme() {
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  const iframe = document.querySelector('iframe.giscus-frame')
  if (!iframe) return
  iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
}

const observer = new MutationObserver(updateGiscusTheme)
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

window.onload = () => {
  updateGiscusTheme()
}
</script>