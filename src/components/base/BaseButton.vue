<template>
  <button class="base-button" @click="$emit('click', $event)">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script>
export default {
  props: {
    label: { type: [Number, String], default: '' },
  },
};
</script>

<style lang="scss">
.base-button {
  position: relative;
  font-family: 'Averia Libre', sans-serif;
  padding: 0 25px;
  margin: 10px;
  height: 48px;
  background-color: #3cc26d;
  border: 0px solid #4caf50;
  border-radius: 3px;
  color: white;
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:focus-within::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 3px;
    box-shadow: 0 0 10px 3px rgba(130, 172, 62, 0.2);
  }
}

button a {
  color: white;
}
</style>
