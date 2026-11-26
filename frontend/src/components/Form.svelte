<script>
  const { onSubmit, children, disabled = false, ...rest } = $props();
</script>

<form
  {...rest}
  onsubmit={(event) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  }}
>
  <div class="form-contents">
    {@render children?.()}
  </div>
</form>

<style>
  .form-contents {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
</style>
