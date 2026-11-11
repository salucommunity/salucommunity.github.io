/* SALU Community AI Assistant. Uses Gemini through your Cloudflare Worker, grounded in the website data and uploaded PDFs. */
(function(){
if(window.__saluAI2)return;window.__saluAI2=1;
if(document.getElementById('loginGate'))return;
var ICON='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABwCAYAAADG4PRLAAAk80lEQVR42u2deXxdZbX3v+vZe58xU5M2HUmgVCgt8zyPCigyCLYoOM/T1eu9Xu/V62upelHvoPeq1yvOoiA0IiBIQUApQrEqyNRCBzrTpkmaoU1ypr2f9f6x9znN2KbNSROUh88haXKyz97P71lr/dbwrAdeHa/oIX9Vz7JowPPMj/69Eu338xtQZMDPXgXwIA1FAKEJYQrCt1GasLDfgAgLMMxDmI+yEn0lAvvKAHARBjCsQmkiGPItqub7O18zI/NcBjZlNFZTUR2rSkySILBBt3b3dGQ75TDR5KlJ5qSub14mi/0hP2sBDvMQwLIY+yqAowVtMf0mulHPS+Sf3Hiov9U/2s/6x5PVBhV9Dd1aSVxm25wVfFURiYsrBgUNUFWbwxEkJpBng1TQZXDWq8tGJ8Uz3tTEs5POTK9fJavyA+7D5QYsMjHBnFgAKkIThoV7VKI4Qu1D0+bSoefb3cFZWtCzNK+zJCYegCqE71bIR08k4V+rRtcQpPQzCxIDjICAmOij8+qLIxslbZ6WhCyjSh7ueMOOF9TXPXO1BMMC7ERSszLBgCupx/pHZh1TeLlwjWbtG7Vgj8GRGBbwFQJACBAiiEqwyTDPp4M+cc8rfJ/i4AGehD8taMHEzXOmwr3Pq3fvbr5w65/D1QIswWElOhFUrEwk4GZ1zqvtub/tartb346vZ0oMV/MKPqgliCRGIqohZb778Kq2tCQcXJCYoHm1EnOekArnJ+kzJt2xtWFVex97Oa5AykQArva+mbPYVfio7dF3qtXpBEBBQfBRzDDSNfZ3Gb6sWlyJCTggIttJyc3xWYmbdpy3eUNJIsdJtR58AJfgFIGb8ccZh2Rf9P8u6A7egyd1FBSCUNIAE7kME0PJE0mZwZGYoJYuk3J+GJuT+MaOMzZtHPhsf30AKsJCDE0E83RexY7bdn7K3xV8DKGOvKIWXwwO7CEcE9QjUyBQxZW4IEK7U+18e9LCyv9YJ+t2ReyZg6VW5WBLXf0vpl+V7/C/rOhcchraNjDS16LJhAWvL4yqYEVwJCEousap8T7XvqC56WBKo4z59ZeEtq7hzw3Tu1/IftX22rerVbD4KI7a8B7klRvUUyDA4OIITsLcHj+64tPbT16/+WDYxrGbtkUYFoeKsO6uGVf4bYVvotpATouqxQxJ8F+pKCpWAOJiQLbFpjl/13pl8y/7zIV95QCoGASrqjL51mlfCHqCz2nov/kY3Als38oxfJWQtTpp5z8vuu7cf2mSpmCsVGr5AYxudM5Tc6a0PdV5EyJvst3WRhEPM6xr/dc1rFowlWJQc1/FidUf2HrC2pdZhDswNDixAIzAm3r31MOyLcE9WOZrTn0RXP4Wh+KTFFeMrI5XJa7ZsWDLynJLoimjzXNZSDDtgUPPzTXb31PQ+eTHDzwjBsc4OMbBiBkfAAVXezWwWXtkviP7aP1Dh7yOhQQsKt+cSNnAW4xf++CM19rN+bs0p2kCAsDpY+Q5WGzTiKEn30PeDxMLMTdGykuj4xfxCjR0N3qdenlT+xWtvymXOh39dEYqoe639Rf564O7NUNalADZA97BBrA718MZ08/gnEPPQgQe27icx19eTkUiHdre8XFZrCpGkvQ6M5yr2i9rebAc6lTKAd60hw89N7uh+z6b0TSKFcGMj8Yy9GR7+Ncz/oXPnvkZPAk1VUDAV574d76w/EukEmlUx00SLYIhTk+8MX5ly8XbHh4tiAcOYOQqzLhzxiG9rf4K9YPpBAQKzngscMc4dGW6uGLO5fzyyiZQ8DXUUI44iAhvued6mtbeQU2imsAG4wqiiZlOtyZ+SuvCretGA6I5QPAEQWc9P6+2d2f+V0XwkPEBr6+OWnDkNagqvvq4xsU1LkGYkmfBUW+eCDFWgxLYgq3Jd2TumPJ84zQWYksx1IMAoNCEWaSLpPsPbd9R5Xh8/L6EZXwiIYpjHGoSNSiK9DG2ImHmtzY+iZjxsOOfh3Ww+OLIsf7y3u8v0AUmqqCTsQdwUSju37rtO59XsQs0oz5FV2EcV7aI4AcFnmz+C0YM1u4ByVqLEcOfm58kG2THz63oP1zt1YIavey3tzz6hci9cPZfmg6AtNQvbXhtfnPmNzZni4Rl3EPRIkLeLzAlOZnfveUhDqs6FI2or4iwpXsr5//8IpozzcScWOl34+3qq2LFExOv9y5puWb7fjPTkS9FRViJNm44ria/pfcm9W2/OpTxng9VJe7GaO7dwWW/uJJ71v+6VDDz4MaHuKzpCl7ufpmYiU8U8EIBEgSrkmstfG/Gqrl1LET3xx6OHMCmMKLe9ei2ryjMVp9goLsw3vNi1ZKOpXmh/QX+6ZF/DlmowKd//xmea3+OdLwiDFJOoCFg8AkwNGb+0P41wJYqyssGYNFZv2vmBdpj309OA3H662uRiZHTU7V44vGaqtcQMzEEobGyAc+EanNC5h0NjmY1sAX7jin3TL+EhYTZizIBKKxE56yZE/dbct9AMBMxkWDERG6DQ8Hmqa+sL/1uZvUMCkEOx4TvmSAkZvA8B0p+e+HrU58+Ns3KkEzvkwmNQPoMCwnaj+h5P3C05geHycbfiAjd+W4K+TyxWAJHDcfXH1t6z3F1x+GJx+5sN7lCBs+LUeFVgDBhVKoIhgBf4hxVWN36CRZzI/NxYO+ERvZJXICGzQ01u+7vfcEWtD6qmzRFtXmwmaYgfb5Cbz5DNpfj7IYzuWT2xZxQfzwNVQ3MqTmcuIkDkLd51u/awJZdW3hqx1+4f/0DPLb18TDIHUuiCoqiqqWv42UBMIBDW/y4qmNaTt/Qwg3I3rL5MhLbV/PTyZ/VDP9GVg+q9IUwmZCoSUA+yJMP8vi+DxLWyTdWzuYrF9zIwiPfjBmhSVeUX667k39++LO81LUaHBdUcB2XmOPhmRgOBhXCSt+DC2hAQhwnbr7S/o6Wz+zLrZB9hMto3NBY3bm0+0Us9dGzj7kBccQBgZyfoyfXC9aS8tJMr55OY1UDs9KzaKxuZFbNTF7feCmHVMwCwLf+ICnty1CL0uWKCwLberZx78b72N69nQ2dG9nctZnN3Vto3tVMT64HjJCKp0i4cVAINDgYMqg4II501J5eddT649e37K2mxt2r2wDBruXZD+LKVM1qIGMsfUYcVJWuXBdBENBQ2cDls9/I+Q3ncdK0E5kzaQ41XvXgJasBjji4xt0ryem7ZAMNmJGewQfmv6/f+zoLnazv2sCT25/id5sfYcW2Fazv2ohjDJXxKowIfhCMnfkQBItPnNr257s/AHwpMll25BIYSd/penpi9fdfWhXkbCMWHas0kSCYKJtg1PDaQy/krUdfy6WNlzAlOWVw6CKSpiIwB8oqrSo2kipBMGL6xVAB2nPtLN14P7c+fxsPbXoYXwNqktVYu+cexsKlRRA8s23aB2qPWi2ru6M8pg4Oqg415uPQhO091r9KM/YDFMIC1vL7bGCMwWLpzHRw0SEXctOl3+ZzZ3yW4yYfS9pLY9XuYYoSEpkiaENN+P6SooHXKqrZ4mem3BTHTj6G6+e9lbNnnU1zdzPPtTyP58ZwjDNWIIbbbDyqs+tzz2eaep4DXJYNlsKhl+7KkH/ancG7NdAx26HgOg75Qg7NK/994df5zbVLubDhAqwqgQ1TQMXaFiNmv7Yj6RD/jVgb9PlMRQk0wKrlgkPOY+mb7+Xbl3wTyUM2n8MxzlipUgjQoEPfFz32CFVoZDCn/qXx0OyK7uc1Typa5GWF0RiHTD7DpHgNt19xK+fMPBurimJDEjMcKCWqv0fX9yUuI42b9r0WkUsyFPkZaGuLAC/ftpwFd7+Vndl2UrFUSRWXXUk5ZGPzEse1nf/y2qHIjBkuOhOszV+FI2k02k5Z5qhJvpCj2qviVwvu5JyZZ1OwBYzIIPCKEhDYPZMXEpaQtJSksy94quRtnl7bS8ZmyNlcP1egqDqd6BqucXBkj5QHNgiTwAOktviegi1w5owzuXfh3dQmasn5Y5aiCkxMkrbZf/NweLnDGFD8jsLlWCj7NsqIPAQ24JbLb+bkySfhWx/PeIOAsxpKY9GtsChbu7ewoWsjL3WuZ0PXBlp3t9Lqt7GrdxedmS5EQK2S10JUUiE4KsScOMYYVC2TkpNIJ9NMdiczrWoqjTWNHFrVyJyaw2moaOinFgMbYEx/9e0ZD9/6nFB3PLddeQuvv/0yAmvHgpmKFhS7y165SBd9dfENi+3eVWhUKjHzmTmzuv/Q8QIFKko6plw+nnFo72nn82d/jsVnLKJgfbwB9N+qLa3ojM3yuy2PsHT9/fyx+U9s7NhIZ7aTvM2HLEhC9yOUHtOH6PTZLB8tmtL31oYvtWFAQAQXj9rkJBprGjll+slcdvjruWDWBSRNYtA9FUfBFvCMxxdX3MjnH11EbbqOwJa18Dqce5dM4viKeTvO2LSxiNHQAEa1inVN094WdPk/1d7yRl4Mht5CL0dWH8kT73iMhBMf0uE2YihogR889yO+85ebeL5tJYEGxNwYcSeOY9wQIA1tl0YdDewISxdL26FUSirXogTqk/Pz5G0ORxzm183ng8e9n/ce+27iJj4IxKIdLdgCZ/7sHJ5vX0XKS5W3/lQJSIrjpJ33tl+344cD60nNAPdBAWyvPV+H8TtGpQ+MkC/k+ftTP07KTYbpnSHA27hrI6+9/VI+/JsPs7prDdWpauoq6kjH0iF1VxvZKR/f+tH3Ntrgbkuux3CvoM/fB+oTEJTIUzqWoi5ZS3W8mjUda/joAx/l/FsvYl3nurBUo0/wW5AwkezE+eRpn6AQ5CPJL7NDAWhezwFgVX9MBnV1OElPctd9f9NTBBxNQS1lKr83Ysj6WRorGvnjO56gwkuXJqEIniBs7XmZi269mLW71jE5XUdgA6zYPQql79eDkKIy4tCeaefQVCMPXnc/h1fP7ieJofRD1mY5/ZazWdOxhqSbLF+WQ7G4YsTjxRnvqz9uYB8bMyDzoM3Pdk2loIdrXinnHnXPccnkM1xy2MVUehVYawfxIxXlww9+lLW71zI5XUe+UCCwFg0iL+gglwRatfi2QF2qjg096/nQAx+N4qHSP/KllqST5NLZF5PNZ3AHELLRhqm0oGheD9/1VK6h5OoNAjCMfVLY0DtXXEmg2HIw0CL139nTjoPDNUddHa7aPlcObIARw9L1D3DfuvupS9WR9wtMlLxr3s9Tl5rMQxse4p6Xfo0R6VcYXIzgXHPE1SSdNG09baFtL486DV16T7zMxsy8yNTJYABXRsVJeT1ZiyHVMuTvfBvQk+nhqsOv5L5r7+Gc6WftyTj0eR/A95/9Qcgt+pQ+TIRSjSJRcmMu33nmpv7B8T7fn1p/CkuvvYdrjnwTuXwuCnqP/uYl6tdh88GJfbEa0jH0M4VZ5bF6oWoxGL77+u/wi6tu5+KG10V1AoOJy9bel/nD9hUkY+l+NZ0TZVi1pGIp/tj8Z17atR4RGUxoUM6beS5Nl9/GD9/wPYya0D8sgyUSQLvtjOFjoYtDB17EHIMf9RcbhfdiROjOdHPD2f+Pd85/e8gWo1DUwIkBWLHtj+zo2UHc9fYZt9yfsNlINcW+HldV8cSlM9PBn7b/ud+9972vQAN86/OWI6/ly+d/kd58Tznu1agPeByDARbvSfCaAcEP/O6gaq+pphHFOQ2ZQoZj6o/hw8d/MMzXReGq4cbK1lWotfv82GKA2Q/8sDdJGbIRfuCHmep9Gt0wSfBs27PDByok3FQaaMD7j30fJ9afQE++d8TVAntT47bbpiLDpv0BjBjo3K5T6hwxMwk79MloJiZbyPCGwy8lYRKgw0fkij9f074GMWZYmhmFnOnO9YBCdbyajJ8lH+QPCEQRIVfI01vopSpWDTbcV7i3a4XlCA7rOl4aZAcHPZOCJx6vn30p+UIWY0YFoGhBcRzTOLdl7vS+TDS86g3hLLY376i2RmtHS1/UKo64nDzt5EGMcyiJAtiRaQljkMPUnzgSRnEuOfRiHnrLAzz+jmUsueLnzEjOIO/n9yuYLCLkgzwz0zP4+eW3sPwdy3jougd4w+GvD6VlmGupKsY4NHfvKEWW9ma0FDhlxim4jjd6v1AhwFbu3NKdHjaYnVuVsxTUjjZ8Fqgl5aSYXX1Yqexvb5OJQld3J8Y4Q8pfccKnp6bz48t+QF28FoDGwxopXOjzlruvI+7G98u1yeVzfPHSxbzp8CvDa6Ua+ckbfsDJPz6Nbb3NxFxvcDGThmmwXZkuAhuUErpDPV/xqefUzKbSq8K3Pk6k/g8wDgk5DfJP54dPJ8lO0SiAPyq/z2JJJ9JUJ6v3sajCh+m1GXptL84wK99E0ndmwxnUxWtLhCjQgPMPOY9ZVbNGrEoFIR8UmJ6axvmHnFe6TsEWqPaqOfvQs8n4Q0uhorhi2GV30xl0jWg+UolUVLo4egkUI46rrjcsgElHkgLOqKIdEgaHjTg4zsgEucd200NvFGvUQVpUENRa5lQc3q8WxhGHylgl0yqmUQgKI6LrIkLBL1BfPZWaRHW/PKCizE7PRgO7V5vtW5+CLezzcyC0g45xRhtAEkDFiEnWxqv7OvP9JbAilmRP4ZKMYrHs1xVUGUHtpZKSVGlii189XNImhcWO+IYVJW7ieOINAidBfJ/xuv1xY4w4GEz4fDI6CcQFKjQ5rATm/UIPlPp16miWS7Fp9UjdjrCkcG+RF6HdtpcyGEVJLGiB3X53OEn7EaTuDXrJaW4QSenVzIgWwL4WXPHXvhZC/zey9aOyTQXUdumuKBqjgwD0A5vT0YbQIg8kCAJ8f2R1IlWmkkqpGNLRL9F3cXmhfXUYAcGW7GBrtpXNXZuJuSPbtKmqxFyPbbu209rTVnK8w/Cd8Fz784hxhyUbqqH0Jpz4iPSQHwRRwfEoZ1XA+tZ27+jdPawE6kwNN0vraD5JcYyhu9BDe2/7PhcVQMzESLiJYSfNWktFIs3jWx7nL61P4xkPz3g44vCzVT9nR++OcPvYCG5cUTzHo623jZuf/ymOOOH1HI+VHatYtvlRKuJDh/NEBF8DqpxKqp3qEdmJ3dnd9BYyESkapSV0xUq9CYZ1IxKHxSW31hr17aj0tWMcdvu7eaHjRU6aemLU4WZ4iRARaitqsa1Dq5pQAh0yfpa3/uptfOLUv6OxuoHlm57gW0/9HxWxiv1iedZaKuIV/OeKr5H1s5x5yBls6trMt578Nj1BN3Fn+F28gQ2YlJ4UZiBUh7WFqoqKsmrnC+wu7KY6UT26yjULkhAnNs9zBgN4A8piqGs8rPXl3MqtODSO1pm3aln+8nLePvf6vbLDYuHS9NS0qJ5kuAmxJL0EW3q28LEHP46LSyEoUJGo3G//SlEcMVhj+fKKf8dd4eKrT8KLE3eHBy8MYAdMTU3tt/j2pmF+v/UxrI1K8UfJ7o0vndMba3e1snWACg3T9rJKlnVrXNsjcdHRgJeOVXDv2vvYltke5s+GWX3FiZ83ed4+bZhVS9yJUxOvIR1PMyk96YCd42Lsc1KyhopEmkmpmlCN7+UeJIqFzq07MhIKO0wgI8xvtuXauHfdfaRi6dFGYhRXCKzd+mzlsy2l5EM/G7gIERFcz2lBdFQAhkQhxsvd21j82BeQqN7TH6Jiq7iCT6g/Ds+J7zOVFNa0hJXSgQ1GVdquhOWNxWvta5LDuhmXE6ae0O/e+xFB65c6Q31h+b+xefcmEm4ca0dbSqC4aaezJHJDkBijqgToi+KMTgLDiQ43gfzouZv5+9/+A+259iF3DxUjHidOPZFDKmeRD3JMxCOdShGciumcNv3UYYPZrnHpzHfyqWWf5qanv0t1oipyI0ZnkcQVFFZioW8/mUF3EEu7LyHlKT2xakl7Kb7x5P9y+k/P5sYVXyEf5PtJTVgJbZkUq+GChvPpzffuNe00XsOIQ0+2hwtmnc+UxORSEVZfac7bPF9e8VVO++lZfP1P3yDlpaJ61FHKnoYVkKbC2TRUiJSIyIT6o9p7iqB8GzlVlEnpGrb1buNfH/4Md6+/p1S+3idZAsBHTvgQCZOYCK2whjQLHh4fO/Ej/Wx3kZkCPLjlIT77239ha/dWapLV5dy5ZAhQPPvHKIymQ0mgArhHJ1ZbX3dJmCspyx0ENiDpJXETCe5ce9cg++GIg1XLifUn8OGTP0RndysxJzZhwIu5MTq6W3jP8e/m1OmnlJhzXzsuCHevvgcnHicdS5VvN69GPQkKtjd9RPzFvlGY/gBGTHT7rDVtJinPE5fI+yjP8AOfhJfgdxsfYWvP1sE1JdG/bzznS7z5yGtp7dqOiMEVdyy2Z4zI5jniImpo7djO62dfzn9d+O+DVKeNXImWTCsPbPgNCTdBoZzl9YLFAfGcFzcfdVoL9G960F9NLgozESbmrJAyn+qgKDETo3n3dn7y7E9LVc0DA8QJE+eWK27mH8/8NFk/y87MTnz1SzuJ9nef4P4AVuw144iDrwHtve1kCxk+dtrHufOaJlJOalC5oEaA/ui5H7O5cxPxvUSUDtgKuYIk5AmkaVBDvCFL602F+9vSUU9lHNZa0olKvv2Xm9jSvTXcnTtEZVfMxPjPc7/Ko299mLcf/Taq3Co6ejvZ2dsW9oMJCqFeKTX36fty9vHa814nWhCqkA8K7M51s7OnjY7eTipMmrcdfR2PXP8w37zwf0rRmaEq6rb3NvO/T/0fqWQFQRBQ1tYzGuaH3AqzbKD9GxzIiwL9DZsaJnUt7V1LoHVRX5iy7k7qyHSw8MgF3PbGW0K/yTiDGF1xdy7A9kwzj7+8nEe2LOPZ5mfZ3LWZjnwnPYVegqDQ/2mkz/d971yH+KqK48RIeSlqk5NoqDyEY6Yew3mHnMNZM89iZmpGCaiBlWtFH9I1Lu+6/z385PmfUpuqDQlN+c5+UkDEk87EhTVHNB+xrnXvu5MgPNSwiaDmh/W/UN9eQ159tIxHB0hIWtq7O/jm6/6bj53wEQq2gGvcIUsOFQZl6ttyO9nR08Km7k207WqjpdDCrvxudvfsoiu3Kyoq0v4AGkFFqYpVUZmsoNKrZFpsGpOr62hINzC9chp1sbpBnz+cv1fcWnbTc9/jww98jJpkTfl36SqBJMQRV37d8d7WN/L5wTt0BwMTnuCMW+nc4XfZa9SW2eRoGIKqTlXzj7/7JyqSFbxr7jvCHbhRmd9AJ79v0wHHOEyO1zE5Xsf82qPKbguLLsFw3S+sho1/POPxszW38vGHPklVonLsWnYZcKrMncVChIHEUobUuYLOWDW3rvfRttXqR1VqZWYOIoK1lmw+y1cuuJFPnviJPaGoASp1KEI0VFuskd6i9vn/cI2Bhgu7FaNJ33n2u/z9w/9APBYP7agt+66bMFbu0hE/u+qolmM37BioPocmKYKyAGfbvBd3Epe7iYsg5T+0KSzRM6QSKf7ht5/irb++ng3dG0uqdLh96n0ZY7G5zx5S4ozo1ZfM9K2JGTb2Gu3Pd43Llp6tvOv+9/Lh+z9KwkuWCo3HgBYHEgeJmftbjt2wgwU4Q+3XHJplLgi/eFPdH2HHrr1WUXpqk3XctmoJZ99yHv/xp/9ie6a5VMndt1y9GMTWMd5jVpS2vm1OWrItfO3P/81ZPzuXn6y8mdqK2j3PoGNyE0ZEcKaZ7/XFZAhKMTx9FVe05qbJf7S+PZkCljHsTO8al5yfozu3m5mVh3DFEW/kzUdezWlTTyXtpocEv7jvvVy9Wor2re/1nmx9kpuf/xl3rfkVm3dtIh2vIOEmSmdSDNDLZTPFuBjjmOeOff+8k5axLGAYQR8ewOJ++bumXx+0FX6mGQ0Y46MFQhLjkA9ydOe7iZkYs6tnc9KMEzlrxpnMnzyfw6oamZyeQlISZdMCRX+u6KB35Dv59Uv38bNVt/LYy4/Tk99NOhYCVzyDYkw1gA3ZpzPJeXf7wh0/3ts5S7JXLaxwEie5627a+LRajhJ7cLoVCoJjwhrRbJAlU8hCYInHEtTEa6hP1zM9OZ3aylpOrz+Vjxz/oSHdkL2pSKsWlH7S9qcdf+b2F5u4e+2vWNfxEo7rUBlL4xi3pFIPwrBqEOPK+uoPpI/eJJtye5PxvT9xUQp/Me3tfqd/M7160Lv17nEtJNry7OMHBXwb4Ad5PBPn2fc+ydyauUO2AtmXimzNtvKrtfdy+4tNLN/2BD353STjaZJuKOGloPTB2toddaUw1d4HOxZu/+6++oXu3UFfjI8iU6m9fdt3Wz9tHT1awlzPQdv8rKr9IvuuOHiei8FgxeLi7tWBLkpbkbki4WFYj217nNtWLeH+l37Dxq4NuK5L2ktTm5qMJTg4vUGHWGM4GLGsrloQu7lD971Tet8RlibMqoWr8lOWTPunfLsuZQyb341U/RV9wD2ZARkCtLCwuO++xLVd67hr7d3c8eKdPNP6DFk/SyqWpjZdG50p3qeGU8bp4VwxZpL3mU2yKRt1rg9GB2B4JIxpvbb5/kk/mHKvhTdSGHtCs7/PPVBFOmH3OtpzHTy46SGaVt/Bss3LaMu0Rb2yU6TjqbBnTB81KeN1xq8SEBfHxOSh9mu338mCkZ3g4u7HB4h7WPyT+dWZCxCSBMVWgeMLXrGvtlVbipIEBDyxbQW/XHcn967+Neu6XkKMhE180nVhwx9r8TWYOCvQAGhPfGb64ygwb2RLaGQALsayBKf1gq3ram+t/1zQY7+umfE/3FiQUlM7I4YXOl/knrX3cteau3m65RkyQYaUl2JSqqYUg/WtP7FO0A41fSBxcU3c+WLzxZte2J/zk/ang6qwEMMSbM0PJv9GfV5LXsf1DAlByAU5Tp12ClNSU3h442/pyHbgOaGKdI0JW3CVzn8dJ/W4D9WpLo5x5fHj3j///GULlylLsCNtc7Yf+5JR5qEIGp+ffj+W9miPsR1PzRN34zyxfQW/XHsnAQF16Voq4mlA8Qf6bjrhwFMMRhzp8g5PvnOZLPOLczxyWPZ3FM9R+sX0q4L2wp2aVT+SwnGzhsVg9MGIk5Y75CpJcd0677q2q7f//ECOYt1/9deEsgQns6D7hdTVFRZHLtKCBuN18HHJtXjlAFdSnZI2ruM4N+68rvl/DvQc3QOb9AVYFuDsfNeOL+HRJHFxAZ9Xx0iHHx6xrXcc/a65i1iAw4IDM0Wj6cYkCJykJ7nrv7t5qVW9iHyf41hfHcNElvAlJq5xnD9MP6PuvFVHr8oPlagdewBDEA2Cnbdh3rTm3+9cFvT4R0QHIr8K4nDOuieOpMy66lMnvW7TUas3FufwwJn46G/KINiGjQ2H7X4094DtCV6jvvryKoiDJc/FlbS8FDshdXHLsZvXjxa8A7eB/ZeAZQnO5kM3b6g8tfoSN+G8IB6v2sQBNk/i4jopZ413YvKSlmM3r2cJTjlaepaHOUZHhm6eu2ZD9RFTzxc1SyVVIjb6Ny14ik9cXCPyu0nzpry29ZgtLx0o4xwbFTqEjzhH58Tbb9n9o6A3eCu5Ur2d+RsDL3zumBiTNL+sOid5/abDogzDwvIViZXf+Q6Ph1FAa2+Z9nnb7S+2eUV0Yh3dOnY8BbCEh0Q7gknKFzvf0/Z5tcrezgE80FH+CV1WOrzXZD7e/UjVu6qfsXk9F49q/OgYH0H+avFTAonjSkxanDr3nR3XtXw7Co4JF5TfnIztREbqYuoTjYfm12b/R3PBFZpTsH990qiKj8GVhCBGlsaOTn6s5dSIrCws9dznlQVgHxARqLtl2oeC3f6XMNRpRjViYa90IMPMaFIMgbY7Ne4NO69t/paIaLnt3dix0H0x1EUYFNl5XfN34nNTp4gnt+AguOJE1Q/2FSdx0RleeDh4YiRummJHJk9rf8uOb4pIaO/GGLyDI4FDSSMw9a6ZFxTaC18MCvYsrEKhlAMzMGFtpBIeoia4GFxBYma5O8X7UttlLy8d+IwHYxz8iVqEYRVCE4G4wqQ7pl5tdwafItAz1ILmFBH8CEgzUaQNsKK4xKMDt4ysMLXma50LW5aor+G2vHlouVnmxANwCGkUR5hy18w35Xfm36e99hLxcDQfNomO7OR4gGkjaTPqYMQRCNSapFnqTY5/f8flW+4WidprHGSpmxgADgEkwMyHZx6X2V54i83q1RroEeKAFhQKEWEI926WTkwtF/lXUJFo367iigfiStjD1OElEzN3OvXuLa2XbHt6uHv/2wSw/2RoMYJxup6eXPOrTWfTY6+yvfZ8CjoPj3D/eaBoAFGRcd8SBLMf0gVa7FATlY56ghjQAkiMF4znPEqduWPWG6Ysf1ae7SmZgPnIWLoGr0wA90iD4QZM380cC3SB89ijK47Lt+VPD3rsueTskVrQI8SVlBY7/GokqRAeOzOwODdq66wK4kV2LOqCrHnNEpN1EjOrTNr5vZniLb/g3NOeaZKmoI/tdrmhpNInzJi4ERFFaMKwEhm4M0dcYcZjh8/Kd3YfHXRSL0ZPDNpthUmZ44IgSGi3FuVMonOAwj7ClYIjTt5mg2ecGrdbVf9iqt0Wt957/oMnvnPLYhlwRu0iXOajLBh5ldirY7iFphgW4bJgeMdfnCgLKcMsVSd6z3BjAQ6LcFEM+soI971yY5JFW9TnKLboUKh9S8oSnNLfzUdZiRYD8K/KyqvjoI7/DyikBt4jxAj9AAAAAElFTkSuQmCC';
var PAGES=[['Home','index.html'],['Admissions','admissions.html'],['Merit List','merit-list.html'],['Fee Structure','fee-structure.html'],['Department Seats','department-seats.html'],['Departments','departments.html'],['Scholarships','scholarships.html'],['Announcements','announcements.html'],['Results','results.html'],['Past Papers','past-papers.html'],['Mock Tests','mock-tests.html'],['Entry Test Preparation','entry-test-preparation.html'],['Aggregate Calculator','aggregate-calculator.html'],['FAQs','faqs.html'],['Contact','contact.html'],['Our Team','our-team.html'],['SSC (Student Society Center)','ssc.html'],['Department Representative','department-representative.html'],['About','about.html']];
var SYN={
vc:'vice chancellor vc head university leadership',chancellor:'vice chancellor chancellor head',vice:'vice chancellor',head:'head chairman director dean incharge chief principal vice chancellor',
registrar:'registrar office administration',dean:'dean faculty head',hod:'chairman head department',chairman:'chairman head department',
cs:'computer science bscs',cse:'computer science',it:'information technology',se:'software engineering',ai:'artificial intelligence',bba:'business administration',mba:'business administration',
fee:'fees fee charges dues challan tuition',fees:'fee charges dues challan tuition',seat:'seats seat quota capacity',seats:'seat quota capacity',
merit:'merit list aggregate selection',scholarship:'scholarship freeship bursary stipend ehsaas hec',wazifa:'scholarship freeship stipend',
admission:'admission admissions apply enrollment',admissions:'admission apply enrollment',dakhla:'admission apply',dakhly:'admission apply',apply:'admission apply form',form:'form apply application',
closing:'closing aggregate percentage chance',chance:'closing aggregate percentage chance',chances:'closing aggregate chance',aggregate:'aggregate formula merit calculator percentage',formula:'aggregate formula merit',
test:'test entry mock practice exam',exam:'test entry exam',paper:'past paper papers',papers:'past paper papers',entry:'entry test',usat:'usat hec test',
department:'department departments faculty program',departments:'department departments faculty program',program:'program programs bs degree department',programs:'program degree department',degree:'degree bs program',
ssc:'ssc student society center societies events',society:'society societies student center ssc',societies:'society student center ssc',events:'events co-curricular calendar activities',hostel:'hostel accommodation residence boarding',transport:'transport bus point',library:'library books',campus:'campus location address khairpur',location:'location address campus khairpur',address:'address location campus',
established:'established founded year history',founded:'established founded year history',history:'history established founded',year:'year established date session',
join:'join team representative volunteer',team:'team our representative members',representative:'representative department team',
date:'date schedule last deadline',deadline:'deadline last date schedule',schedule:'schedule date deadline',
contact:'contact phone email whatsapp office',number:'contact phone number',phone:'contact phone number',email:'email contact address',
who:'name head person',name:'name',rules:'rules policy conditions requirements',eligibility:'eligibility criteria requirement minimum',criteria:'criteria eligibility requirement minimum',
sindh:'sindh quota domicile',domicile:'domicile quota sindh',quota:'quota seats domicile reserved',reserved:'reserved quota seats',
timing:'timing time schedule',documents:'documents required attested copies',required:'required documents requirement'};
var STOP=new Set('the a an is are was were of to in on for and or me my i you what how when where which who whom whose do does did can could should would tell about please kya hai hain ho ka ki ke ko se me mein men aur ya kab kahan kaise kon kaun konsa batao btao bataye bataen mujhe mjhe hamen with this that it be will there any there our your their its at as by from have has had if so than then too very just also more most some such only own same into'.split(' '));
var STEM=function(w){if(w.length>4&&/ies$/.test(w))return w.slice(0,-3)+'y';if(w.length>4&&/(ing|ers)$/.test(w))return w.slice(0,-3);if(w.length>3&&/(es|ed)$/.test(w)&&w.length>4)return w.slice(0,-2);if(w.length>3&&/s$/.test(w)&&!/ss$/.test(w))return w.slice(0,-1);return w;};
function norm(s){return String(s||'').toLowerCase().replace(/[^a-z0-9؀-ۿ\s]/g,' ');}
function words(s){return norm(s).split(/\s+/).filter(function(w){return w.length>1;});}
function toks(s){var o=[];words(s).forEach(function(w){if(STOP.has(w))return;o.push(STEM(w));if(SYN[w])SYN[w].split(' ').forEach(function(x){o.push(STEM(x));});});return o;}
function g(n){try{return(0,eval)('typeof '+n+'!=="undefined"?'+n+':null');}catch(e){return null;}}
function clip(s,n){s=String(s==null?'':s).replace(/\s+/g,' ').trim();return s.length>n?s.slice(0,n-1)+'…':s;}
var chunks=[],built=false,kb=null,kbWait=null,df={},vocab=[],N=1;
function add(t,src,link,boost,pdf){t=clip(t,pdf?1500:900);if(t.length<12)return;var k=toks(t+' '+src);chunks.push({t:'['+src+'] '+t,src:src,link:link||'',k:k,set:null,b:boost||0,pdf:!!pdf});}
function build(){
 chunks=[];
 var a=g('ANNOUNCE')||[];a.forEach(function(x,i){add((x.d||'')+' - '+(x.t||'')+'. '+(x.b||''),'Announcement',x.pdf,i===0?.8:0);});
 (g('MERITS')||[]).forEach(function(m){add('Merit list: '+(m.t||'')+'. '+(m.d||''),'Merit List',m.pdf);});
 (g('FEES')||[]).forEach(function(f){add('Fee for '+(f.d||'')+': '+(f.f||''),'Fee Structure');});
 (g('SCHOLARSHIPS')||[]).forEach(function(s){add((s.n||'')+': '+(s.f||''),'Scholarship');});
 var depts=g('DEPTS')||[],by={};depts.forEach(function(d){(by[d.f||'Other']=by[d.f||'Other']||[]).push(d.n);});
 Object.keys(by).forEach(function(f){add('Faculty of '+f+' departments: '+by[f].join(', '),'Departments');});
 (g('SEATS')||[]).forEach(function(s){add('Seats in '+s[1]+' ('+s[0]+'): BS-I Merit '+s[2]+', BS-I Self-Finance '+s[3]+', BS-III Merit '+s[4]+', BS-III Self-Finance '+s[5]+' ("—" means no seats).','Department Seats');});
 (g('FAQS')||[]).forEach(function(f){add('Q: '+f[0]+' A: '+f[1],'FAQ');});
 var cl=window.SALU_CLOSING;if(cl&&cl.length){for(var i=0;i<cl.length;i+=6)add('Closing aggregate percentages, batch 2026 (expected only, changes with entry test difficulty, not a guarantee): '+cl.slice(i,i+6).map(function(c){return c[0]+' '+c[1]+'%';}).join('; '),'Closing Aggregate');}
 add('Pages of this website: '+PAGES.map(function(p){return p[0]+' ('+p[1]+')';}).join(', '),'Site Map',null,0);chunks[chunks.length-1].map=1;
 add('Merit aggregate formula: Pre-Entry Test (or passed HEC USAT) 50%, Intermediate 30%, Matriculation 20%.','Aggregate Formula');
 if(kb&&kb.docs)kb.docs.forEach(function(d){(d.chunks||[]).forEach(function(c){add(c,'Prospectus/PDF: '+d.name,'',0,true);});});
 df={};var vs={};
 chunks.forEach(function(c){c.set={};c.k.forEach(function(w){c.set[w]=(c.set[w]||0)+1;vs[w]=1;});Object.keys(c.set).forEach(function(w){df[w]=(df[w]||0)+1;});});
 N=chunks.length||1;vocab=Object.keys(vs);built=true;
}
function lev1(a,b){if(a===b)return true;var la=a.length,lb=b.length;if(Math.abs(la-lb)>1)return false;var i=0,j=0,e=0;while(i<la&&j<lb){if(a[i]===b[j]){i++;j++;continue;}if(++e>1)return false;if(la>lb)i++;else if(lb>la)j++;else{i++;j++;}}return e+(la-i)+(lb-j)<=1;}
function expand(w){var out=[[w,1]];if(w.length<4)return out;for(var i=0;i<vocab.length;i++){var v=vocab[i];if(v===w)continue;if(v.length>=5&&w.length>=5&&(v.indexOf(w)===0||w.indexOf(v)===0)){out.push([v,.7]);}else if(w.length>=5&&lev1(w,v)){out.push([v,.6]);}}return out.slice(0,8);}
function loadKB(){
 if(kbWait)return kbWait;
 kbWait=new Promise(function(res){
  if(window.SALU_AI_KB){kb=window.SALU_AI_KB;built=false;return res();}
  var s=document.createElement('script');s.src='salu-ai-kb.js?v='+Math.floor(Date.now()/600000);
  s.onload=function(){kb=window.SALU_AI_KB||null;built=false;res();};s.onerror=function(){res();};document.head.appendChild(s);
 });
 return kbWait;
}
function score(qt,c){
 var s=c.b,len=Math.max(40,c.k.length);
 qt.forEach(function(q){var w=q[0],wt=q[1],tf=c.set[w];if(!tf)return;var idf=Math.log(1+(N-(df[w]||0)+.5)/((df[w]||0)+.5));s+=wt*idf*(tf*2.2)/(tf+1.2*(.25+.75*len/150));});
 return c.map?Math.min(s,1):s;
}
function retrieve(q,n,extra){
 if(!built)build();
 var base=toks(q),seen={},qt=[];
 function addq(arr,wt){arr.forEach(function(w){if(seen[w])return;seen[w]=1;expand(w).forEach(function(e){qt.push([e[0],e[1]*wt]);});});}
 addq(base,1);if(extra)addq(toks(extra),.5);
 var all=chunks.map(function(c){return{c:c,s:score(qt,c)};}).filter(function(x){return x.s>0;});
 all.sort(function(a,b){return b.s-a.s;});
 var top=all.slice(0,n||10),have={};top.forEach(function(x){have[x.c.t]=1;});
 var pdf=all.filter(function(x){return x.c.pdf&&!have[x.c.t];}).slice(0,Math.ceil((n||10)*.6));
 var out=top.concat(pdf).map(function(x){return x.c;});out.top=top.length?top[0].s:0;return out;
}
function lang(q){
 if(/[\u067a\u067b\u067d\u067f\u0680\u0683\u0684\u0687\u068a\u068c\u068d\u068f\u0699\u06a6\u06aa\u06b1\u06b3\u06bb]/.test(q))return 'sd';
 if(/[\u0600-\u06ff]/.test(q))return 'ur';
 var w=norm(q).split(/\s+/),hit=0;w.forEach(function(x){if(/^(kya|hai|hain|kitni|kitna|kitne|ka|ki|ke|ko|mein|men|nahi|nahin|kab|kahan|kaise|kese|batao|btao|bataye|mujhe|mjhe|aap|ap|hum|tum|kon|kaun|konsa|chahiye|chahie|karna|karen|kare|kr|sakta|sakti|wala|wali|hoga|hogi|liye|lye|se|par|per|aur|ya|dakhla|wazifa|jaldi|chha|aahe|ahe|kithe|kiyan|chho|aa|jo|khe|ji|je|mein)$/.test(x))hit++;});
 return hit>=2||(hit>=1&&w.length<=3)?'roman':'en';}
var MSG={
 en:{busy:'SALU Community AI Assistant is busy right now. Please try again in a minute.',slow:'SALU Community AI Assistant is taking too long. Please try again.',down:'SALU Community AI Assistant is not reachable right now. Please try again later.',fail:'SALU Community AI Assistant could not answer this time.',off:'The AI is not switched on yet, so this is a simple website search.',none:'I could not find this in the website data or the prospectus. Please check the Announcements page or contact the SALU office.',found:'Here is what I found on the website:'},
 roman:{busy:'SALU Community AI Assistant abhi busy hai. Meharbani karke ek minute baad dobara try karen.',slow:'SALU Community AI Assistant ko jawab dene mein der lag rahi hai. Dobara try karen.',down:'SALU Community AI Assistant abhi available nahi hai. Baad mein try karen.',fail:'SALU Community AI Assistant is waqt jawab nahi de saka.',off:'AI abhi on nahi hai, is liye sirf website search se jawab hai.',none:'Yeh maloomat mujhe website ya prospectus mein nahi mili. Announcements page dekhen ya SALU office se rabta karen.',found:'Website par yeh maloomat mili:'},
 ur:{busy:'SALU Community AI Assistant اس وقت مصروف ہے۔ براہ کرم ایک منٹ بعد دوبارہ کوشش کریں۔',slow:'SALU Community AI Assistant کو جواب دینے میں دیر لگ رہی ہے۔ دوبارہ کوشش کریں۔',down:'SALU Community AI Assistant اس وقت دستیاب نہیں ہے۔ بعد میں کوشش کریں۔',fail:'SALU Community AI Assistant اس بار جواب نہیں دے سکا۔',off:'AI ابھی آن نہیں ہے، اس لیے صرف ویب سائٹ سرچ سے جواب ہے۔',none:'یہ معلومات ویب سائٹ یا پراسپیکٹس میں نہیں ملیں۔ براہ کرم اعلانات کا صفحہ دیکھیں یا SALU آفس سے رابطہ کریں۔',found:'ویب سائٹ پر یہ معلومات ملیں:'},
 sd:{busy:'SALU Community AI Assistant هاڻي مصروف آهي. مهرباني ڪري هڪ منٽ کانپوءِ ٻيهر ڪوشش ڪريو.',slow:'SALU Community AI Assistant کي جواب ڏيڻ ۾ دير ٿي رهي آهي. ٻيهر ڪوشش ڪريو.',down:'SALU Community AI Assistant هن وقت موجود ناهي. پوءِ ڪوشش ڪريو.',fail:'SALU Community AI Assistant هن ڀيري جواب نه ڏئي سگهيو.',off:'AI اڃا آن ناهي، تنهنڪري رڳو ويب سائيٽ سرچ مان جواب آهي.',none:'هيءَ معلومات ويب سائيٽ يا پراسپيڪٽس ۾ نه ملي. مهرباني ڪري اعلانن وارو صفحو ڏسو يا SALU آفيس سان رابطو ڪريو.',found:'ويب سائيٽ تي هيءَ معلومات ملي:'}
};
function m(L,k){return(MSG[L]||MSG.en)[k];}
var history=[],busy=false,open=false,els={};
function css(){
 var s=document.createElement('style');s.textContent=
 '#saluAiBtn{position:fixed;right:14px;bottom:calc(86px + env(safe-area-inset-bottom,0px));z-index:179;width:58px;height:58px;border-radius:50%;border:2px solid rgba(255,255,255,.8);padding:0;background:#fff;cursor:pointer;box-shadow:0 10px 26px rgba(15,23,42,.28);overflow:hidden;transition:transform .2s}'+
 '#saluAiBtn:hover{transform:translateY(-3px) scale(1.05)}#saluAiBtn:focus-visible{outline:3px solid #86efac;outline-offset:3px}#saluAiBtn img{width:100%;height:100%;object-fit:cover;display:block}'+
 '#saluAiTip{position:fixed;right:14px;bottom:calc(152px + env(safe-area-inset-bottom,0px));z-index:320;background:#0f5132;color:#fff;font:600 13px/1.3 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:9px 14px;border-radius:14px 14px 4px 14px;box-shadow:0 8px 22px rgba(15,23,42,.3);opacity:0;transform:translateX(10px);transition:opacity .35s,transform .35s;pointer-events:none;white-space:nowrap}#saluAiTip.on{opacity:1;transform:none}@media(max-width:640px){#saluAiTip{right:12px;bottom:calc(138px + env(safe-area-inset-bottom,0px));font-size:12.5px}}body.sp-secure #saluAiTip{display:none!important}'+
 '#saluAiBtn .dot{position:absolute;right:4px;top:4px;width:12px;height:12px;border-radius:50%;background:#22c55e;border:2px solid #fff}'+
 '#saluAi{position:fixed;right:14px;bottom:calc(86px + env(safe-area-inset-bottom,0px));z-index:310;width:min(390px,calc(100vw - 24px));height:min(560px,calc(100vh - 110px));display:none;flex-direction:column;background:#fff;color:#0f172a;border-radius:20px;overflow:hidden;box-shadow:0 24px 70px rgba(15,23,42,.38);border:1px solid rgba(148,163,184,.4);font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}'+
 '#saluAi.on{display:flex}'+
 '#saluAi header{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(135deg,#0f5132,#16a34a);color:#fff}'+
 '#saluAi header img{width:38px;height:38px;border-radius:50%;background:#fff;object-fit:cover}#saluAi header b{display:block;font-size:15px}#saluAi header span{font-size:12px;opacity:.9}'+
 '#saluAi header button{margin-left:auto;background:rgba(255,255,255,.18);border:0;color:#fff;width:32px;height:32px;border-radius:50%;font-size:20px;line-height:1;cursor:pointer}'+
 '#saluAiLog{flex:1;overflow-y:auto;padding:14px;background:#f1f5f9;display:flex;flex-direction:column;gap:10px;-webkit-overflow-scrolling:touch}'+
 '#saluAiLog .m{max-width:88%;padding:9px 12px;border-radius:16px;word-wrap:break-word;overflow-wrap:anywhere;white-space:pre-wrap}'+
 '#saluAiLog .bot{align-self:flex-start;background:#fff;border:1px solid #e2e8f0;border-bottom-left-radius:4px}'+
 '#saluAiLog .me{align-self:flex-end;background:#16a34a;color:#fff;border-bottom-right-radius:4px}'+
 '#saluAiLog .note{align-self:flex-start;font-size:12px;color:#92400e;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:6px 10px}'+
 '#saluAiLog a{color:#0f766e;font-weight:600}#saluAiLog .me a{color:#fff}'+
 '#saluAiLog .typing span{display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#94a3b8;animation:saluDot 1.2s infinite}#saluAiLog .typing span:nth-child(2){animation-delay:.2s}#saluAiLog .typing span:nth-child(3){animation-delay:.4s}'+
 '@keyframes saluDot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}'+
 '#saluAiChips{display:flex;gap:6px;overflow-x:auto;padding:8px 10px;background:#f1f5f9;border-top:1px solid #e2e8f0;scrollbar-width:none}#saluAiChips::-webkit-scrollbar{display:none}'+
 '#saluAiChips button{flex:0 0 auto;border:1px solid #bbf7d0;background:#f0fdf4;color:#166534;border-radius:999px;padding:6px 11px;font:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap}'+
 '#saluAiNote{padding:0 12px 9px;background:#fff;color:#64748b;font-size:11px;text-align:center}'+
 '#saluAi form{display:flex;gap:8px;padding:10px;background:#fff;border-top:1px solid #e2e8f0}'+
 '#saluAi input{flex:1;min-width:0;border:1px solid #cbd5e1;border-radius:999px;padding:10px 14px;font:inherit;font-size:16px;background:#fff;color:#0f172a}#saluAi input:focus{outline:2px solid #86efac;border-color:#16a34a}'+
 '#saluAi form button{border:0;background:#16a34a;color:#fff;border-radius:999px;padding:0 16px;font:inherit;font-weight:700;cursor:pointer}#saluAi form button:disabled{opacity:.55;cursor:default}'+
 '@media(max-width:640px){#saluAiBtn{bottom:calc(76px + env(safe-area-inset-bottom,0px));right:12px;width:52px;height:52px}#saluAi{right:8px;left:8px;width:auto;bottom:calc(8px + env(safe-area-inset-bottom,0px));height:min(78vh,620px)}}'+
 'body.sp-secure #saluAiBtn,body.sp-secure #saluAi{display:none!important}'+
 '@media(prefers-color-scheme:dark){#saluAi{background:#0f172a;color:#e2e8f0;border-color:#334155}#saluAiLog,#saluAiChips{background:#0b1220}#saluAiLog .bot{background:#1e293b;border-color:#334155;color:#e2e8f0}#saluAi form,#saluAiNote{background:#0f172a;border-color:#334155}#saluAi input{background:#1e293b;border-color:#334155;color:#e2e8f0}#saluAiChips{border-color:#334155}#saluAiChips button{background:#14532d;border-color:#166534;color:#dcfce7}}';
 document.head.appendChild(s);
}
function link(text){
 var h=String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 h=h.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');
 h=h.replace(/(https?:\/\/[^\s<)]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>');
 h=h.replace(/\b([a-z0-9-]+\.html)\b(?![^<]*<\/a>)/g,'<a href="$1">$1</a>');
 return h;
}
function say(kind,text,html){var d=document.createElement('div');d.className='m '+kind;if(html)d.innerHTML=text;else d.innerHTML=link(text);els.log.appendChild(d);els.log.scrollTop=els.log.scrollHeight;return d;}
function note(t){var d=document.createElement('div');d.className='note';d.textContent=t;els.log.appendChild(d);els.log.scrollTop=els.log.scrollHeight;}
function endpoint(){var u=(kb&&kb.endpoint)||'';return /^https:\/\//i.test(u)?u:'';}
var CATS=[['Aggregate Calculator',/calculat/],['Fees',/\b(fee|fees|tuition|challan|dues|charges)\b/],['Seats',/\b(seat|seats|quota|capacity)\b/],['Scholarships',/scholarship|freeship|bursar|stipend|ehsaas|wazifa/],['Hostel & Campus',/hostel|accommodation|library|transport|campus|sport|medical|wifi|canteen|mess\b/],['Entry Test & Past Papers',/entry test|usat|pre-entry|past paper|mock|\btest\b|mcq|syllabus|prepar/],['Merit & Closing Aggregate',/merit|closing|aggregate|percentage|\\bchances?\\b|cutoff|cut off/],['Admissions',/admission|\bapply|application|\bform\b|deadline|last date|schedule|dakhla|document|eligib/],['Leadership & Contacts',/vice chancellor|\bvc\b|registrar|\bdean\b|chairman|\bhead\b|contact|phone|email|address|office|director/],['SSC & Student Life',/\bssc\b|societ|student affairs|\bevent|\bclub|co-curricular|debate|calendar/],['Team & Representatives',/\bteam\b|representative|volunteer|\bjoin/],['Departments & Programs',/department|program|degree|faculty|course|subject|computer science|pharmacy|\blaw\b|\bbs\b/]];
function classify(text){var t=norm(text);for(var i=0;i<CATS.length;i++)if(CATS[i][1].test(t))return CATS[i][0];return 'Other';}
function qkey(text){var seen={},out=[];toks(text).forEach(function(w){if(!seen[w]){seen[w]=1;out.push(w);}});return out.sort().slice(0,14).join(' ');}
function offlineAnswer(q,L){
 var hits=retrieve(q,5).filter(function(h){return!h.map;}).slice(0,3);
 if(!hits.length)return m(L,'none');
 return m(L,'found')+'\n\n'+hits.map(function(h){return '• '+clip(h.t,420)+(h.link?'\n  '+h.link:'');}).join('\n\n');
}
async function post(ep,payload,ms){
 var ctl=new AbortController(),t=setTimeout(function(){ctl.abort();},ms);
 try{var r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},signal:ctl.signal,body:JSON.stringify(payload)});var d=await r.json().catch(function(){return{};});return{r:r,d:d};}finally{clearTimeout(t);}
}
async function ask(q){
 if(busy)return;q=clip(q,500);if(!q)return;busy=true;els.send.disabled=true;
 say('me',q);var L=lang(q),wait=say('bot typing','<span></span><span></span><span></span>',true);
 try{await loadKB();}catch(e){}
 var ep=endpoint(),answer='',problem='';
 var prev='';for(var h=history.length-1;h>=0;h--){if(history[h].role==='user'){prev=history[h].text;break;}}
 var hits=retrieve(q,10,words(q).length<=5?prev:''),kwText='';
 // Understand the question first: for Urdu/Sindhi/Roman or weak matches, ask the AI for English search keywords, then search again.
 if(ep&&(L!=='en'||!hits.length||hits.top<3)){
  try{var kw=await post(ep,{mode:'keywords',question:q,history:history.slice(-4)},9000);
   if(kw.r.ok&&kw.d.keywords){kwText=String(kw.d.keywords);var more=retrieve(q+' '+String(kw.d.keywords),10,'');if(more.length)hits=more;}}catch(e){}
 }
 if(!ep){problem=m(L,'off');}
 else{
  try{
   var res=await post(ep,{question:q,context:hits.map(function(h){return h.t+(h.link?' (Link: '+h.link+')':'');}),history:history.slice(-8),lang:L,page:location.pathname.split('/').pop()||'index.html',log:{c:classify(q+' '+kwText),k:qkey(kwText||q),h:hits.top>=3?1:0}},28000);
   if(res.r.ok&&res.d.answer)answer=String(res.d.answer);
   else problem=(res.r.status===429||res.r.status>=500)?m(L,'busy'):m(L,'fail');
  }catch(e){problem=e&&e.name==='AbortError'?m(L,'slow'):m(L,'down');}
 }
 wait.remove();
 if(answer){say('bot',answer);history.push({role:'user',text:q},{role:'model',text:answer});history=history.slice(-10);}
 else{note(problem);var fb=offlineAnswer(q,L);say('bot',fb);history.push({role:'user',text:q},{role:'model',text:clip(fb,500)});}
 busy=false;els.send.disabled=false;els.input.focus();
}
function toggle(on){open=on===undefined?!open:on;els.box.classList.toggle('on',open);els.btn.style.display=open?'none':'';if(open){loadKB().then(function(){build();});setTimeout(function(){els.input.focus();},60);}}
function init(){
 css();
 var b=document.createElement('button');b.id='saluAiBtn';b.type='button';b.setAttribute('aria-label','Open SALU AI Assistant');b.innerHTML='<img src="'+ICON+'" alt=""><span class="dot"></span>';
 var bx=document.createElement('section');bx.id='saluAi';bx.setAttribute('role','dialog');bx.setAttribute('aria-label','SALU AI Assistant');
 bx.innerHTML='<header><img src="'+ICON+'" alt=""><div><b>SALU Community AI Assistant</b><span>Ask anything about SALU</span></div><button type="button" aria-label="Close" id="saluAiX">×</button></header><div id="saluAiLog" aria-live="polite"></div><div id="saluAiChips"></div><form id="saluAiForm" autocomplete="off"><input id="saluAiIn" maxlength="500" placeholder="Ask your question…" aria-label="Your question"><button type="submit" id="saluAiSend">Send</button></form><div id="saluAiNote">Questions are saved anonymously to improve this assistant.</div>';
 document.body.appendChild(b);document.body.appendChild(bx);
 els={btn:b,box:bx,log:bx.querySelector('#saluAiLog'),input:bx.querySelector('#saluAiIn'),send:bx.querySelector('#saluAiSend')};
 var chips=bx.querySelector('#saluAiChips');
 [['Latest announcement','What is the latest announcement?'],['Merit formula','How is the merit aggregate calculated?'],['CS fee & seats','What are the fee and seats for BS Computer Science?'],['Scholarships','Which scholarships are available?'],['Past papers','Where can I find past papers?'],['Join team','How can I join the team?']].forEach(function(c){var x=document.createElement('button');x.type='button';x.textContent=c[0];x.onclick=function(){ask(c[1]);};chips.appendChild(x);});
 var tip=document.createElement('div');tip.id='saluAiTip';tip.textContent='Ask SALU Community AI Assistant';tip.setAttribute('aria-hidden','true');document.body.appendChild(tip);els.tip=tip;
 setTimeout(function(){if(!open)tip.classList.add('on');},900);setTimeout(function(){tip.classList.remove('on');},900+6000);
 b.onclick=function(){tip.classList.remove('on');toggle(true);};bx.querySelector('#saluAiX').onclick=function(){toggle(false);};
 bx.querySelector('#saluAiForm').onsubmit=function(e){e.preventDefault();var v=els.input.value;els.input.value='';ask(v);};
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&open)toggle(false);});
 say('bot','Hello! I am the SALU Community AI Assistant. You can ask me anything about SALU in English, Urdu or Sindhi. Write in any language and I will reply in the same language.');
 loadKB().then(function(){build();});
}
if(document.body)init();else document.addEventListener('DOMContentLoaded',init);
})();
