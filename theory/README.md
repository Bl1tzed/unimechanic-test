Код выводит: Bad:undefined Bad:undefined Bad:undefined Bad:undefined

Вариант 1:

```js
for (let i = 0; i < arr.length; i++) {
  setTimeout(() => {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
  }, 3000);
}
```

Вариант 2:

```js
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
}
```
