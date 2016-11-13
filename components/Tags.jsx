import React from 'react';

class Tags extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <th>Acronim</th>
          <th>Full name</th>
          <th>example</th>
        </thead>
        <tbody>
          <tr id="CC">
            <td>CC</td>
            <td>Coord Conjuncn</td>
            <td>and,but,or</td>
          </tr>
          <tr id="CD">
            <td>CD</td>
            <td>Cardinal number</td>
            <td>one,two</td>
          </tr>
          <tr id="DT">
            <td>DT</td>
            <td>Didminer</td>
            <td>the,some</td>
          </tr>
          <tr id="EX">
            <td>EX</td>
            <td>Existential there</td>
            <td>there</td>
          </tr>
          <tr id="FW">
            <td>FW</td>
            <td>Foreign Word</td>
            <td>mon dieu</td>
          </tr>
          <tr id="IN">
            <td>IN</td>
            <td>Preposition</td>
            <td>of,in,by</td>
          </tr>
          <tr id="JJ">
            <td>JJ</td>
            <td>Adjective</td>
            <td>big</td>
          </tr>
          <tr id="JJR">
            <td>JJR</td>
            <td>Adj., comparative</td>
            <td>bigger</td>
          </tr>
          <tr id="JJS">
            <td>JJS</td>
            <td>Adj., superlative</td>
            <td>biggest</td>
          </tr>
          <tr id="LS">
            <td>LS</td>
            <td>List item marker</td>
            <td>1,One</td>
          </tr>
          <tr id="MD">
            <td>MD</td>
            <td>Modal</td>
            <td>can,should</td>
          </tr>
          <tr id="NN">
            <td>NN</td>
            <td>Noun, sing. or mass</td>
            <td>dog</td>
          </tr>
          <tr id="NNP">
            <td>NNP</td>
            <td>Proper noun, sing.</td>
            <td>Edinburgh</td>
          </tr>
          <tr id="NNPS">
            <td>NNPS</td>
            <td>Proper noun, plural</td>
            <td>Smiths</td>
          </tr>
          <tr id="NNS">
            <td>NNS</td>
            <td>Noun, plural</td>
            <td>dogs</td>
          </tr>
          <tr id="POS">
            <td>POS</td>
            <td>Possessive ending</td>
            <td>&rsquo;s</td>
          </tr>
          <tr id="PDT">
            <td>PDT</td>
            <td>Predeterminer</td>
            <td>all, both</td>
          </tr>
          <tr id="PP$">
            <td>PP$</td>
            <td>Possessive pronoun</td>
            <td>my one&rsquo;s</td>
          </tr>
          <tr id="PRP">
            <td>PRP</td>
            <td>Personal pronoun</td>
            <td>I,you,she</td>
          </tr>
          <tr id="RB">
            <td>RB</td>
            <td>Adverb</td>
            <td>quickly</td>
          </tr>
          <tr id="RBR">
            <td>RBR</td>
            <td>Adverb, comparative</td>
            <td>faster</td>
          </tr>
          <tr id="RBS">
            <td>RBS</td>
            <td>Adverb, superlative</td>
            <td>fastest</td>
          </tr>
          <tr id="RP">
            <td>RP</td>
            <td>Particle</td>
            <td>up,off</td>
          </tr>
          <tr id="SYM">
            <td>SYM</td>
            <td>Symbol</td>
            <td>+,%,&</td>
          </tr>
          <tr id="TO">
            <td>TO</td>
            <td>to</td>
            <td>to</td>
          </tr>
          <tr id="UH">
            <td>UH</td>
            <td>Interjection</td>
            <td>oh, oops</td>
          </tr>
          <tr id="VB">
            <td>VB</td>
            <td>verb, base form</td>
            <td>eat</td>
          </tr>
          <tr id="VBD">
            <td>VBD</td>
            <td>verb, past tense</td>
            <td>ate</td>
          </tr>
          <tr id="VBG">
            <td>VBG</td>
            <td>verb, gerund</td>
            <td>eating</td>
          </tr>
          <tr id="VBN">
            <td>VBD</td>
            <td>verb, past part</td>
            <td>eaten</td>
          </tr>
          <tr id="VBP">
            <td>VBP</td>
            <td>Verb, present</td>
            <td>eat</td>
          </tr>
          <tr id="VBZ">
            <td>VBD</td>
            <td>Verb, present</td>
            <td>eats</td>
          </tr>
          <tr id="WDT">
            <td>WDT</td>
            <td>Wh-determiner</td>
            <td>which,that</td>
          </tr>
          <tr id="WP">
            <td>WP</td>
            <td>Wh pronoun</td>
            <td>who,what</td>
          </tr>
          <tr id="WP$">
            <td>WP$</td>
            <td>Possessive-Wh</td>
            <td>whose</td>
          </tr>
          <tr name="WRB">
            <td>WRB</td>
            <td>Wh-adverb</td>
            <td>how,where</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Tags;
