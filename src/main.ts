import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//primevue config
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primeicons/primeicons.css'

//imports global components
import Menubar from 'primevue/menubar'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Card from 'primevue/card'
import ProgressSpinner from 'primevue/progressspinner'
import Paginator from 'primevue/paginator'
import Toast from 'primevue/toast'
import Menu from 'primevue/menu'
import Avatar from 'primevue/avatar'
import RadioButton from 'primevue/radiobutton'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'

const app = createApp(App)

app.use(createPinia())
app.use(router).use(PrimeVue).use(ToastService)

//global components
app.component('PMenubar', Menubar)
app.component('PMenu', Menu)
app.component('PAvatar', Avatar)
app.component('PDialog', Dialog)
app.component('PInputText', InputText)
app.component('PTextarea', Textarea)
app.component('PButton', Button)
app.component('PCard', Card)
app.component('PProgressSpinner', ProgressSpinner)
app.component('PPaginator', Paginator)
app.component('Toast', Toast)
app.component('PRadioButton', RadioButton)
app.component('PCalendar', Calendar)
app.component('PInputNumber', InputNumber)

app.mount('#app')
