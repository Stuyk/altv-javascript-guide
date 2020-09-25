# Nastaviť klienta _debugging_

V tejto fáze by ste mali mať nastaveného alt:V klienta.

Prejdite do priečinka, kde sa nachádza váš `altv.exe`, a vyhľadajte súbor `altv.cfg`.

![](../../img/edit_cfg.png)

## altv.cfg

Skontrolujte, či je parameter `debug` nastavený na hodnotu `true`.

Ak neexistuje, vytvorte ho.

```sh
debug: 'true'
```

## Opätovné pripojenie

Po reštartovaní servera budete odpojení. Môžete sa znova pripojiť iba k serveru s nastavením `debug` nastaveným na hodnotu `true` a nastavením `debug` vášho vlastného klienta na hodnotu `true`.

Jednoducho stlačte kláves `F8`

**Server bez hesla**

a zadajte nasledovný príkaz:

```
reconnect
```

**Server s heslom**

ak váš server je zabezpečené heslo, zadajte nasledovný príkaz:

```
reconnect <heslo>
```
