# task3_simple.py
from music21 import stream, note, chord, instrument
import random

# Create a music stream
output_stream = stream.Stream()

# Generate 30 random notes/chords
for i in range(30):
    if random.choice([True, False]):
        # Single note
        n = note.Note(random.choice(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']))
        n.quarterLength = random.choice([0.25, 0.5, 1])
        n.storedInstrument = instrument.Piano()
        output_stream.append(n)
    else:
        # Chord (3 random notes)
        c = chord.Chord(random.sample(['C4', 'E4', 'G4', 'B4', 'D5'], 3))
        c.quarterLength = random.choice([0.5, 1])
        c.storedInstrument = instrument.Piano()
        output_stream.append(c)

# Save as MIDI file
output_stream.write('midi', fp='simple_music.mid')
print("✅ Music generated and saved as simple_music.mid")
