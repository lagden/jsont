# jsont

Parse a JSON to another JSON

## Usage

**Atenção:** É apenas protótipo!

Utilizando o `original.json` como base:

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

Crie o seu novo **output** através de um template escrito em `Dust`

### Exemplo

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

## License

MIT © [Thiago Lagden](http://lagden.in)

