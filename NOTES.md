## Safe OSCAR transactions

**FIRST COMMANDS**:
- RPP/RLC-
- RT

`isOkay = true`

**FOLLOWING COMMANDS**:
- RPP/RHA
- RHA

`isOkay = true`

- MD*
- MU*
- MT*
- MB*

*check if it's okay

- if value != one of the four transactions, `isOkay = false`
- if isOkay = true, MD and MU are safe
- if isOkay = false, MD and MU are not safe