// src/plugins/vuetify.ts
import { createVuetify } from "vuetify";
import { /* aliases, */ mdi } from "vuetify/iconsets/mdi";
import {
  VApp,
  VBtn,
  VCard,
  VCardActions,
  VCardItem,
  VCheckbox,
  VCol,
  VContainer,
  VDivider,
  VIcon,
  VRadio,
  VRadioGroup,
  VRow,
  VSelect,
  VSpacer,
  VTextField,
} from "vuetify/components";
import * as directives from "vuetify/directives";

export const vuetify = createVuetify({
  components: {
    VApp,
    VBtn,
    VCard,
    VCardActions,
    VCardItem,
    VCheckbox,
    VCol,
    VContainer,
    VDivider,
    VIcon,
    VRadio,
    VRadioGroup,
    VRow,
    VSelect,
    VSpacer,
    VTextField,
  },
  directives,

  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#0070FF",

          // 기본
          "on-background": "#2A2A2A",

          // 커스텀
          "custom-on-surface": "#2A2A2A",
          "custom-on-surface-light": "#999999",
        },
      },
    },
  },

  icons: {
    defaultSet: "mdi",
    sets: {
      mdi,
    },
  },
});
