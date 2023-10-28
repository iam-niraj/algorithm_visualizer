import os
from django.http import HttpResponse
from django.shortcuts import redirect, render
import requests,json
from django.views.decorators.csrf import csrf_exempt
from io import BytesIO
import tokenize
import ast
import svgwrite

@csrf_exempt
def index(request):
    return render(request,'index.html')

@csrf_exempt
def format_code(request):
    if request.method == 'POST':
        code = request.POST.get('code', '')
        # print(code)
        formatted_output = code.replace('\n','\\n').replace('"', "'")
        # print('hello',formatted_output)
        request.session['code'] = code
        request.session['my_variable'] = formatted_output
        return createASTfromAPI(request)

@csrf_exempt
def createASTfromAPI(request):
    my_variable = request.session.get('my_variable')
    # print(f"import ast \ncode = '{my_variable}' \nparsed_ast = ast.parse(code) \nast.dump(parsed_ast)")
    r = requests.post('https://online-code-compiler.p.rapidapi.com/v1/' , 
            headers = {
                'X-RapidAPI-Key' : 'bf3d23b953msh22d99c684dcfdebp1ad975jsn742acbd71271',
                'X-RapidAPI-Host' : 'online-code-compiler.p.rapidapi.com',
                'Content-Type' : 'application/json'
            },
            json = {
                    "language": "python3",
                    "version": "latest",
                    "code": f"import ast \ncode = '''{my_variable}''' \nparsed_ast = ast.parse(code) \nprint(ast.dump(parsed_ast))",
                    "input": None
            },
            )
    parsed_output = json.loads(r.text)
    actual_output = parsed_output["output"]
    request.session['output'] = actual_output

    code_to_parse = request.session.get('code')
    ast_tree = ast.parse(code_to_parse)
    ast_dict = ast_to_dict(ast_tree)
    result_list = []
    traverse_dict(ast_dict, result_list)
    value_list = []
    for path, value in result_list:
        value_list.append(value)
    print(value_list)

    mapped_list = map_shapes(value_list)
    print('mapped list:',mapped_list)

    
    return HttpResponse(actual_output)

@csrf_exempt
def ast_to_dict(node):
    if isinstance(node, ast.AST):
        return {
            'node_type': type(node).__name__,
            'fields': {field: ast_to_dict(value) for field, value in ast.iter_fields(node)}
        }
    elif isinstance(node, list):
        return [ast_to_dict(item) for item in node]
    else:
        return node

@csrf_exempt
def traverse_dict(node, result_list, current_path=None):
    if current_path is None:
        current_path = []

    if isinstance(node, dict):
        for key, value in node.items():
            new_path = current_path + [key]
            traverse_dict(value, result_list, new_path)
    elif isinstance(node, list):
        for index, item in enumerate(node):
            new_path = current_path + [index]
            traverse_dict(item, result_list, new_path)
    else:
        result_list.append((current_path, node))

def map_shapes(result_list):
    with open('api/shapes_config.json', 'r') as file:
        shape_mapping = json.load(file)

    def get_shape(node_type):
        return shape_mapping.get(node_type, 'ellipse')  

    mapped_list = {};
    
    for value in result_list:
        node_type = value
        shape = get_shape(node_type)
        # print(f"{node_type}:{shape}")
        mapped_list.update({f"{value}" : f"{shape}"})

    return mapped_list



