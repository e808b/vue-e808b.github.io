<script setup lang="ts">
import { ref, computed } from 'vue'
import AppLayout from '@/components/AppLayout.vue'
import { ExampleBefore, ExampleAfterSoft, ExampleAfterHard } from '@/constants/csscompressor'

const exampleMode = {
  Soft: ExampleAfterSoft,
  Hard: ExampleAfterHard,
}

const selectedMode = ref<'Soft' | 'Hard'>('Soft')
const selectedExample = computed(() => exampleMode[selectedMode.value])

/*
const isExampleVisible = ref<boolean>(false)

const toggleExample = () => {
  isExampleVisible.value = !isExampleVisible.value
}
*/

//#region Upload CSS

const userCSS = ref<string>('')

const clearCSS = () => {
  userCSS.value = ''
}

const fileInput = ref<HTMLInputElement | null>(null)

const uploadCSS = () => {
  fileInput.value?.click()
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // 파일 확장자 검사 (선택적)
  if (!file.name.endsWith('.css')) {
    alert('CSS 파일만 업로드할 수 있습니다.')
    target.value = ''
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    userCSS.value = reader.result as string
  }

  reader.onerror = () => {
    alert('파일을 읽는 중 오류가 발생했습니다.')
  }

  reader.readAsText(file, 'utf-8')

  // 같은 파일을 다시 선택할 수 있도록 초기화
  target.value = ''
}

//#endregion

//#region Compress CSS

const compressedCSS = ref<string>('')

const compressCSS = async () => {
  if (selectedMode.value === 'Soft') {
    compressedCSS.value = await getSoftCSS(await getHardCSS())
  } else {
    compressedCSS.value = await getHardCSS()
  }
}

const getHardCSS = async () => {
  return (
    userCSS.value
      // 1. 주석 제거
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // 2. 구분자 주변 공백 제거
      .replace(/\s*([{}:;,])\s*/g, '$1')
      // 3. 다중 공백을 하나로 축소
      .replace(/\s+/g, ' ')
      // 4. 마지막 세미콜론 제거
      .replace(/;\}/g, '}')
      // 5. 줄바꿈 제거
      .replace(/\n/g, '')
      // 6. 0단위(px, em 등) 제거
      .replace(/0(px|em|re|vh|vw|vmin|vmax|pt|pc|cm|mm|in)/g, '0')
      // 7. 색상 축약 (#ffffff → #fff)
      .replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, '#$1$2$3')
      // 8. 소수점 앞 0 제거 (0.5 → .5)
      .replace(/(\s|:|,|\()0\.(\d+)/g, '$1.$2')
      // 9. 앞뒤 공백 제거
      .trim()
  )
}

const getSoftCSS = async (css: string) => {
  let result = ''
  let curlyBracketCount = 0
  let isRule = false

  const insertBeforeLast = (str: string) => {
    const temp = result[result.length - 1]
    result = result.slice(0, -1)
    result += str + temp
  }

  for (let i = 0; i < css.length; i++) {
    const c = css[i]

    result += c

    // 문자열 체크
    if (c === "'" || c === '"') {
      const quote = c

      for (let j = i + 1; j < css.length; j++) {
        const cc = css[j]
        result += cc

        if (cc === quote) {
          if (css[j - 1] === '\\') {
            continue
          } else {
            i = j
            break
          }
        }
      }
    }
    // At Rules
    else if (c === '@') {
      isRule = true
    }
    // 여는 중괄호
    else if (c === '{') {
      insertBeforeLast(' ')
      curlyBracketCount++

      if (isRule && curlyBracketCount === 1) {
        result += '\n'
      } else {
        result += ' '
      }
    }
    // 닫는 중괄호
    else if (c === '}') {
      curlyBracketCount--

      if (i - 1 > 0 && css[i - 1] !== '}') {
        insertBeforeLast(' ')
      }

      if (isRule && curlyBracketCount === 0) {
        insertBeforeLast('\n')
      }

      result += '\n'

      if (isRule) isRule = false
    }
    // 세미콜론
    else if (c === ';') {
      if (curlyBracketCount > 0) {
        result += ' '
      } else {
        result += '\n'

        if (isRule) isRule = false
      }
    }
    // 쉼표
    else if (c === ',') {
      result += ' '
    }
  }

  return result.trim()
}

//#endregion

const copyCompressedCSS = async () => {
  try {
    await navigator.clipboard.writeText(compressedCSS.value + '\n')
    alert('Copied!')
  } catch (err) {
    alert('Error')
  }
}
</script>

<template>
  <AppLayout>
    <section class="mb-8">
      <div>
        <span class="text-h5 text-lg-h4 font-weight-bold">CSS Compressor</span>
      </div>

      <div class="mt-1 mt-lg-2">
        <span class="text-subtitle-2 text-lg-subtitle-1 text-grey">
          CSS Minifier, CSS Optimizer, CSS Formatter, CSS Beautifier, CSS Prettifier, CSS Cleaner
        </span>
      </div>

      <div class="border-b mt-4"></div>
    </section>

    <section class="mb-8">
      <div class="d-flex align-end justify-space-between">
        <div class="text-h5 font-weight-bold">Your CSS</div>
        <div class="d-flex ga-3">
          <v-btn size="small" @click="clearCSS">CLEAR</v-btn>
          <input
            ref="fileInput"
            type="file"
            accept=".css"
            @change="onFileChange"
            style="display: none"
          />
          <v-btn size="small" color="primary" @click="uploadCSS">UPLOAD</v-btn>
        </div>
      </div>
      <div class="mt-4">
        <div class="pa-4 pt-3 border" style="height: 270px">
          <textarea
            v-model="userCSS"
            name="textarea-1"
            class="css-compressor__textarea w-100 h-100"
            placeholder="Paste your CSS here"
            spellcheck="false"
          ></textarea>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <div class="d-flex align-end justify-space-between">
        <div class="text-h5 font-weight-bold">Mode</div>
      </div>
      <div class="mt-4">
        <div class="border">
          <v-select
            v-model="selectedMode"
            label="Mode"
            hide-details
            single-line
            :items="['Soft', 'Hard']"
          ></v-select>
          <div class="pa-4">
            <!--
            <div class="d-flex align-center" style="height: 56px">
              <button id="__btn-example" @click="toggleExample">
                <template v-if="isExampleVisible">
                  <v-icon class="__btn-example-icon" size="x-small">mdi-chevron-down</v-icon>
                </template>
                <template v-else>
                  <v-icon class="__btn-example-icon" size="x-small">mdi-chevron-right</v-icon>
                </template>
              </button>
              <label class="text-subtitle-2 cursor-pointer" for="__btn-example"
                ><span class="ml-1">example</span>
              </label>
            </div>
            -->
            <div
              class="css-compressor__mode-example-flow d-flex align-center justify-space-between ga-4"
            >
              <!-- :class="{ on: isExampleVisible }" -->
              <div
                class="css-compressor__mode-example-code w-100 pa-4 pt-3 bg-grey-darken-4 border"
                style="min-height: 198px"
              >
                <div v-html="ExampleBefore"></div>
              </div>
              <v-icon class="css-compressor__mode-example-flow-icon">mdi-chevron-right</v-icon>
              <div
                class="css-compressor__mode-example-code w-100 pa-4 pt-3 bg-grey-darken-4 border"
                style="min-height: 198px"
              >
                <div v-html="selectedExample"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <div class="d-flex justify-center">
        <v-btn v-if="userCSS.length" size="x-large" color="primary" @click="compressCSS"
          >COMPRESS</v-btn
        >
        <v-btn v-else size="x-large" color="grey-darken-5" disabled @click="compressCSS"
          >COMPRESS</v-btn
        >
      </div>
    </section>

    <section>
      <div class="d-flex align-end justify-space-between">
        <div class="text-h5 font-weight-bold">Result</div>
        <div>
          <v-btn size="small" :disabled="!compressedCSS.length" @click="copyCompressedCSS"
            >COPY</v-btn
          >
        </div>
      </div>
      <div class="mt-4">
        <div class="pa-4 pt-3 bg-grey-lighten-4 border" style="height: 270px">
          <textarea
            v-model="compressedCSS"
            name="textarea-2"
            class="css-compressor__textarea w-100 h-100"
            spellcheck="false"
            readonly
          ></textarea>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style lang="css" scoped>
.css-compressor__textarea {
  resize: none;
  overflow-x: hidden;
  overflow-y: auto;
  outline: none;
  overscroll-behavior: none;
  font-family:
    Consolas,
    Monaco,
    Andale Mono,
    Ubuntu Mono,
    monospace;
}

.css-compressor__mode-example-flow {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease;
  /* on */
  max-height: max-content;
}

/*
.css-compressor__mode-example-flow.on {
  max-height: max-content;
}
*/

.css-compressor__mode-example-code {
  outline: none;
  font-family:
    Consolas,
    Monaco,
    Andale Mono,
    Ubuntu Mono,
    monospace;
  word-break: break-all;
}

@media (max-width: 959px) {
  .css-compressor__mode-example-flow {
    flex-direction: column;
  }

  .css-compressor__mode-example-flow-icon {
    transform: rotate(90deg);
  }
}
</style>
