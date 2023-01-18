from django.http import JsonResponse

import openai

openai.api_key = "API-KEY"

def ask_question(request):
    
        completions = openai.Completion.create(
            engine="text-davinci-003",
            prompt=request.GET.get('q'),
            max_tokens=2048,
            n=1,
            stop=None,
            temperature=0.5,
        )

        message = completions.choices[0].text
        # print(message)
        return JsonResponse({"answers": message})