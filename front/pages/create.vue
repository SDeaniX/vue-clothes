<template>
    <div>
        <form 
            accept-charset="UTF-8"
            v-on:submit.prevent="onSubmit()"
            method="POST"
        >
            <div class="form-line">
                <label> Пароль
                    <input type="password" v-model="password"  placeholder="Название">
                </label>
                <label> Последний вход
                    <input type="datetime-local" v-model="last_login" placeholder="Введите значение">
                </label>
                <label> email
                    <input type="email" v-model="email" placeholder="Введите значение">
                </label>
                <label> Имя
                    <input type="text" v-model="first_name" placeholder="Введите значение">
                </label>
                <label> Фамилия
                    <input type="text" v-model="last_name" placeholder="Введите значение">
                </label>
            </div>
            <v-btn class="submit-btn" type="submit">Отправить</v-btn>
        </form>
    </div>
</template>

<script>
export default {
  data() {
      return {
        password: '',
        last_login: new Date(),
        email: '',
        first_name: '',
        last_name: ''
    }
  },
  methods: {
      async onSubmit() {
        const data = {
            password: this.password,
            last_login: this.last_login,
            email: this.email,
            first_name: this.first_name,
            last_name: this.last_name,
        }  
        if (
            data.password === '' ||
            data.email === '' ||
            data.first_name === '' ||
            data.last_name === ''
        ) {
            alert('Заполните все поля формы')
        } else {
            await this.$store.dispatch('postForm/postForm', data);
            alert(JSON.stringify(this.$store.getters['postForm/answer']));
            await this.$store.dispatch('her/fetch');
        }
      }
  }
}
</script>


<style scoped>
    .submit-btn {
        background: #fefefe;
        padding: 10px;
        color: #000;
        border-radius: 10px;
    }

    select {
        background: #fff;
        padding: 5px;
        width: 100%;
        border-radius: 10px;
    }

    .form-line {
        margin-bottom: 15px
    }


    input {
        background: #dedede;
        color: #000;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 15px;
    }

    form {
        max-width: 500px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }
</style>
