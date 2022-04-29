# Helm Chart Template

It's a template repo that renders templates using a template.

![need_to_go_deeper](weneedtogodeeper.jpeg)

## How to read this nonsense

Both Helm and Jinja2 use `{{curly brackets}}` to render values. This is a problem when you are trying to render a Helm chart template using Jinja2. The solution:

```yaml
raw
...(Helm stuff)
endraw
```

(I am not using the correct syntax for raw/endraw, because as far as I am aware it is not possible to escape the escape sequence)

This stops Jinja2 from rendering anything inside of this statement.

Notice that we need to wrap anything that we actually **want** to be templated by Jinja2 in the opposite:

```yaml
endraw
...(Jinja2 stuff)
raw
```
