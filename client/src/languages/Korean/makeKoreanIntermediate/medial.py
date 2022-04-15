# The vowels to follow after the first initial consonants.

# These are numbers instead of letters because the assumption is that
# the initial consonants will have already been typed. These numbers
# will then be fed into the Unicode algorithm for Hangul Jamo blocks
# The keys with a value array of length 2 means that there are two intermediate
# keystrokes

medial = {
	0: [0],					# ㅏ
	1: [1],					# ㅐ
	2: [2],					# ㅑ
	3: [3],					# ㅒ
	4: [4],					# ㅓ
	5: [5],					# ㅔ
	6: [6],					# ㅕ
	7: [7],					# ㅖ
	8: [8],					# ㅗ
	9: [8, 9],				# ㅘ
	10: [8, 10],			# ㅙ
	11: [8, 11],			# ㅚ
	12: [12],				# ㅛ
	13: [13],				# ㅜ
	14: [13, 14],			# ㅝ
	15: [13, 15],			# ㅞ
	16: [13, 16],			# ㅟ	
	17: [17],				# ㅠ
	18: [18],				# ㅡ
	19: [18, 19],			# ㅢ
	20: [20],				# ㅣ
}