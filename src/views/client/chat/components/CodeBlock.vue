<template>
  <div class="code-block">
    <pre v-for="(line, index) in lines" :key="index" class="code-line">
      <span class="line-number">{{ index + 1 }}</span>
      <span class="code-content">{{ line }}</span>
    </pre>
  </div>
</template>

<script>
export default {
  name: 'CodeBlock',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  computed: {
    lines() {
      // 将代码字符串分割成多行
      return this.code.split('\n')
    }
  }
}
</script>

<style scoped>
.code-block {
  background-color: #f5f5f5; /* 代码块背景色 */
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto; /* 如果代码很长，允许横向滚动 */
}

.code-line {
  display: flex;
}

.line-number {
  color: #888; /* 行号颜色 */
  width: 40px; /* 行号宽度 */
  text-align: right; /* 行号右对齐 */
  padding-right: 10px; /* 行号和代码内容之间的间距 */
  user-select: none; /* 防止行号被选中 */
}

.code-content {
  white-space: pre; /* 保持原始的空白字符 */
}
</style>
