
export function fullNameFormat(fullName :string) {
    const nameParts = fullName.split(' ')
    const fullNameFormated = nameParts.map(name => name.charAt(0).toUpperCase() + name.substring(1))
  
    return fullNameFormated.join(' ')
}

export function nameInInitialsFormat(fullName :string) {
  if(!fullName) {
      console.error("Nome inválido")
      return;
  }
  
  const initials :string[] = []
  
  const fullNameBroken :string[]= fullName.split(' ')
    fullNameBroken.map((name, index) => {
      if(index === 0) {
        initials.push(name.charAt(0))
      }
      if(index === fullNameBroken.length - 1) {
        initials.push(name.charAt(0))
      }
    })

    return initials.join('')
}

export function formatHourNumberInHHMMStr(hourNumber :number) {
  const parteInteira = parseInt(hourNumber.toString().split(".")[0])
  const parteDecimal = hourNumber - parteInteira

  const minutes = Math.round(parteDecimal * 60)

  const hourFormated = parteInteira.toString().padStart(2, '0')
  const minutesFormated = minutes.toString().padStart(2, '0')

  return hourFormated + ':' + minutesFormated
}

export function formatTimeSecondsInHHMMStr(timeSeconds :number) {
  const totalMinutes = timeSeconds / 60
  const minutes = totalMinutes % 60
  const hours = ( totalMinutes - minutes ) / 60

  const hoursFormated = hours.toString().padStart(2, '0')
  const minutesFormated = minutes.toString().padStart(2, '0')

  return hoursFormated + ':' + minutesFormated
}

export function toUpperCaseFirstChar(text :string) {
  return text.charAt(0).toUpperCase() + text.substring(1)
}

export const formatCentavosToReal = (centavos: string | number) => {
    const value = Number(centavos || 0) / 100
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

export const parseInputToCentavos = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "")
    return onlyNumbers
}

export function formatWhileTyping(value: string) {
    if (!value) return { centavos: 0, display: "" };

    // Verifica se o usuário está tentando digitar um valor negativo
    const isNegative = value.trim().startsWith("-");

    // Remove tudo que não é número
    const onlyDigits = value.replace(/\D/g, "");

    // Campo apagado completamente
    if (onlyDigits === "") {
        return {
            centavos: 0,
            display: isNegative ? "-" : ""
        };
    }

    // Converte para centavos
    const centavos = Number(onlyDigits);

    // Se centavos = 0 → deixamos vazio, mas preservando o "-"
    if (centavos === 0) {
        return {
            centavos: 0,
            display: isNegative ? "-" : ""
        };
    }

    // Gera valor em reais
    const formatted = (centavos / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    });

    // Se negativo → prefixa com "-"
    const display = isNegative ? `-${formatted}` : formatted;

    return { 
        centavos: isNegative ? -centavos : centavos, 
        display 
    };
}
