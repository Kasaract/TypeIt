from initial import initial
from medial import medial
from final import final

numInitial = 19
numMedial = 21
numFinal = 28

def getChar(initial, medial, final):
  # https://en.wikipedia.org/wiki/Korean_language_and_computers
  return chr((588 * initial + 28 * medial + final) + 44032)


syllables = []

syllables.append('{\n')

for i in range(numInitial):
  for j in range(numMedial):
    for k in range(numFinal):
      syllables.append('\t' + getChar(i, j, k) + ': ')
      syllables.append('[')

      # Add initial consonant
      syllables.append("'" + initial[i] + "', ")

      # Add medial vowel(s)
      for vowel in medial[j]:
        syllables.append("'" + getChar(i, vowel, 0) + "', ")

      # Add final consonant(s)
      for consonant in final[k]:
        syllables.append("'" + getChar(i, j, consonant) + "', ")

      syllables.append('],\n')

syllables.append('}')

intermediate = open("intermediate.txt", "w", encoding="utf-8")
intermediate.writelines(syllables)
intermediate.close()