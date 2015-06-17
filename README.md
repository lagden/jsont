# jsont

> Transform a JSON to another JSON structure using template.

## About

Using the `original.json` as base:

```json
{
    "clientes": {
        "cliente": [{
            "nome": "Thiago Lagden",
            "dados": {
                "telefone": "11 23456789",
                "email": "lagden@gmail.com"
            }
        }, {
            "nome": "Sabrina Magalhães",
            "dados": {
                "telefone": "11 98765432",
                "email": "sabrina@gmail.com"
            }
        }]
    }
}
```

Create your new **structure** through of a template written in `Dust`

**template/mkt.dust**

```dust
{
  "emails": [
    {#clientes.cliente}
      "{.dados.email}"{@sep}, {/sep}
    {/clientes.cliente}
  ]
}
```

**output/mkt.json**

```json
{
    "emails": ["lagden@gmail.com", "sabrina@gmail.com"]
}
```

### Example

Open the Shell an run:

```
PREFIX=users node --harmony index.js
```

## License

MIT © [Thiago Lagden](http://lagden.in)

