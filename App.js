import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { decode } from 'he';


const TriviaScreen = () => {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);

  function decoder(str) {
    return decode(str);
}

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=3&category=22&difficulty=easy&type=multiple',
      );
      const result = await response.json();
      setData(result.results);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const { question, incorrect_answers, correct_answer } = data[0];

      const allAnswers = [...incorrect_answers, correct_answer].map(answer => decoder(answer));
      const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random());
      setQuestion(decoder(question));
      setAnswers(shuffledAnswers);
    }
  }, [data]);

  const getAnswerStyle = (answer) => {
    if (answer === data[0].correct_answer) {
      return { fontWeight: 'bold' };
    }
    return {};
  };

  return (
    <View style={styles.container}>
      {question ? (
        <>
          <Text style={styles.text}>{question}</Text>
          {answers.map((answer) => (
            <Text key={answer} style={styles.choice}>
              {answer}
            </Text>
          ))}
          <Text style={styles.text}>Correct answer: {decoder(data[0].correct_answer)}</Text>
        </>
      ) : (
        <Text style={styles.text}>Loading question...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20
  },
  choice: {
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    width: 200,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default TriviaScreen;
